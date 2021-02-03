const { RemoteGraphQLDataSource } = require('@apollo/gateway');

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    async willSendRequest({ request, context }) {
        if (context.req === undefined) {
          // This means that the gateway is starting up.
          // It will ping the microservices for their schema.
          request.http.headers.set(
            process.env.GATEWAY_INIT_HEADER_NAME, // x-gateway
            process.env.GATEWAY_INIT_HEADER_VALUE // superSecretGatewaySecret
          );
          return;
        }
    
        const headers = context.req.headers;
        if (headers === undefined) return;
    
        Object.keys(headers).map(
          (key) => request.http && request.http.headers.set(key, headers[key])
        );
      }
    
      didReceiveResponse({ response, request, context }) {
        if (context.res === undefined) return response;
    
        const cookie = response.http.headers.get("set-cookie");
        if (cookie) {
          // Forward set cookies
          context.res.set("set-cookie", cookie);
        }
    
        return response;
      }
  }

export default AuthenticatedDataSource;