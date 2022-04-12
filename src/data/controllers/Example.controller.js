import { ExampleService } from '../services/Example.service';

export class ExampleController {
  async handle(req, res) {
    try {
      const service = new ExampleService();

      const example = await service.execute(req);

      return res.status(200).json({
        body: example.foo,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        body: err,
      });
    }
  }
}
