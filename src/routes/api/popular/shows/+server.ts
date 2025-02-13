import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { movieData } from "$lib/Movie.svelte";

export const GET: RequestHandler = async ({ url }) => {
  const page = url.searchParams.get("page") || "1";

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );

  const data = await response.json();
  const shows: movieData[] = data.results;

  return new Response(JSON.stringify(shows), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
