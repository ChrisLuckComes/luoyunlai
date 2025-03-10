export const SINGLE_SPA = `\`\`\`ts 
import singleSpa from 'single-spa';

singleSpa.registerApplication({
    name: 'app1',
    app: () => import('./app1/app1.js'),
    activeWhen: '/app1'
});

singleSpa.start();
\`\`\``;

export const QIANKUN = `\`\`\`ts
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    {
        name: 'app1',
        entry: '//localhost:8081',
        container: '#sub - app - container',
        activeRule: '/app1'
    }
]);

start();
\`\`\``;