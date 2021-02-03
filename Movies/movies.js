import { gql } from "apollo-server-express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const fetchLink = {
    trending: `/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`,
    nf_original: `/discover/tv?api_key=${process.env.API_KEY}&with_networks=213`,
    toprated: `/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US`,
    action: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=28`,
    comedy: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=35`,
    horror: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=27`,
    romance: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=10749`,
    documentory: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=99`,
};

const getType = (type) => {
    switch(type) {
        case "Trending":
            return fetchLink.trending;
        case "Original":
            return fetchLink.nf_original;
        case "Top":
            return fetchLink.toprated;
        case "Action":
            return fetchLink.action;
        case "Comedy":
            return fetchLink.comedy;
        case "Horror":
            return fetchLink.horror;
        case "Romance":
            return fetchLink.romance;
        case "Documentory":
            return fetchLink.documentory;
      }
};

export const typeDefs = gql`
  extend type Query {
    fetchMovies(type: String): [Movie]
  }

  type Movie {
    imdb_id: ID
    original_language: String
    original_title: String
    overview: String
    popularity: String
    poster_path: String
    backdrop_path: String
    release_date: String
  }
`;

export const resolvers = {
  Query: {
    fetchMovies: async (_, { type }, context) => {
     const rosolveType = getType(type);
     const response = await axios.get(process.env.BASE_URL+rosolveType);
     return response.data.results;
    },
  },
};