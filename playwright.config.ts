import { defineConfig, devices } from '@playwright/test'
const isDebug = !!process.env['npm_config_argv']?.includes(':debug')
const isCi = !!process.env['CI']

export default defineConfig({
    globalTimeout: 20_000_000, // час проходження абсолютно всіх запущених тестів
    timeout: isDebug ? 0 : 1_600_000, // час проходження одного-єдиного запущеного тесту
    testDir: './tests', // папка з тестами
    testMatch: '**/*.spec.ts', // вказує тип розширення файлу з тестами
    fullyParallel: false, // параметр що дозволяє (чи не дозволяє) паралельний запуск тестів
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0, // параметр що визначає кількість перезапусків
    workers: process.env.CI ? 3 : undefined,

    reporter: [
        ['list'],
        [
            'html',
            {
                open: 'on-failure',
                outputFolder: 'html-results',
            },
        ],
    ],

    expect: {
        timeout: isCi ? 100_000 : 45_000, // параметр що визначає максимальний час очікування
    },

    use: {
        actionTimeout: 10_000, // параметр що визначає максимальний час дії над якимось елементом (клік, натискання клавіш)
        navigationTimeout: 30_000, // параметр що визначає максимальний час очікування переходу на ту чи іншу сторінку
        trace: {
            mode: 'retain-on-failure',
            screenshots: true,
        },

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',

        headless: false,  // параметр що визначає чи буде відображатись браузер під час виконання тестів

        // testIdAttribute: 'id',
        // baseURL: 'https://www.bitvegas.io/',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chromium'],
            },
        },
        /* {
              name: 'firefox',
           use: { ...devices['Desktop Firefox'] },
          },*/
    ],
});
