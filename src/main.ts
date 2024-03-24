import { appFactory } from './app.factory';

async function bootstrap() {
  const [app, module, setUp] = await appFactory();

  console.log(`Strating ${module.name} ...`);

  setUp(app);
}

bootstrap();
