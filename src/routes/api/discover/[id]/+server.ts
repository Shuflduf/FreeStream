import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { movieData } from "$lib/Movie.svelte";
import type { GenreId } from "$lib/utils/genres";

export const GET: RequestHandler = async ({ params }) => {
  const genreId = Number(params.id) as GenreId;
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );

  const data = await response.json();
  const movies: movieData[] = data.results;

  return new Response(JSON.stringify(movies), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
