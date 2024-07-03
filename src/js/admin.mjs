import { fetchTopScore } from './externalservices.mjs';

export async function getTopScore() {
    return await fetchTopScore();
}
