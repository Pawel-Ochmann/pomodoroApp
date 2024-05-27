import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { formatTime } from '../utils/timeFormatHadler';
import { getJoke } from '../utils/getJoke';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

describe('formatTime', () => {
  it('should format time correctly when given seconds', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(59)).toBe('00:59');
    expect(formatTime(120)).toBe('02:00');
    expect(formatTime(3599)).toBe('59:59');
  });

  it('should format time correctly when given minutes', () => {
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(90)).toBe('01:30');
    expect(formatTime(3600)).toBe('60:00');
    expect(formatTime(7200)).toBe('120:00');
  });

  it('should format time correctly when given hours', () => {
    expect(formatTime(3660)).toBe('61:00');
    expect(formatTime(7260)).toBe('121:00');
    expect(formatTime(10800)).toBe('180:00');
  });

  it('should handle large numbers', () => {
    expect(formatTime(86400)).toBe('1440:00');
    expect(formatTime(172800)).toBe('2880:00');
  });
});

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getJoke', () => {
  it('should return a two-part joke when the API returns a twopart joke', async () => {
    server.use(
      http.get('https://v2.jokeapi.dev/joke/Any', () => {
        return HttpResponse.json({
          error: false,
          category: 'Pun',
          type: 'twopart',
          setup: 'What do you call a bear with no teeth?',
          delivery: 'A gummy bear!',
        });
      })
    );

    const joke = await getJoke();
    expect(joke).toBe('What do you call a bear with no teeth? A gummy bear!');
  });

  it('should return a single-line joke when the API returns a single joke', async () => {
    server.use(
      http.get('https://v2.jokeapi.dev/joke/Any', () => {
        return HttpResponse.json({
          error: false,
          category: 'Miscellaneous',
          type: 'single',
          joke: 'Why did the tomato turn red? Because it saw the salad dressing!',
        });
      })
    );

    const joke = await getJoke();
    expect(joke).toBe(
      'Why did the tomato turn red? Because it saw the salad dressing!'
    );
  });

  it('should return null when the API returns an error', async () => {
    server.use(
      http.get('https://v2.jokeapi.dev/joke/Any', () => {
        return HttpResponse.json({
          error: true,
          code: 1,
          message: 'Oops, something went wrong!',
        });
      })
    );

    const joke = await getJoke();
    expect(joke).toBeNull();
  });

  it('should return null when there is a network error', async () => {
    server.use(
      http.get('https://v2.jokeapi.dev/joke/Any', () => {
        return HttpResponse.error();
      })
    );

    const joke = await getJoke();
    expect(joke).toBeNull();
  });
});
