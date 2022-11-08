export class ListHello {
  async execute(req, res) {
    console.log(
      '##############################################################'
    );
    console.log('LISTA:');

    console.log(
      '##############################################################'
    );

    return res.status(200).json({
      ok: 'ok',
    });
  }
}
