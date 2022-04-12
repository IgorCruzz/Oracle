import Example from '../database/models/Example';

export class ExampleService {
  async execute() {
    await Example.create({ name: 'example' });

    await Example.findAll();

    await Example.destroy({
      id: 'id',
    });

    await Example.update({ id: 'id' }, { name: 'change' });

    return {
      foo: 'bar',
    };
  }
}
