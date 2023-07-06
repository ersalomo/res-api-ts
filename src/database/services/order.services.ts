import prisma from '../../../prisma/prisma-client';

export default class OrderService {
  private _model = prisma.orders

  async createOrder(payload:any) {
    return this._model.create({ data: payload })
  }

  async updateStatusOrder(id: string, status:StatusOrder) {
    return this._model.update({
      where: {
        id,
      },
      data: { status }
    })
  }

  async getOrdersByIdUser(id: string) {
    return this._model.findFirst({
      where: {
        id
      }
    })
  }
}
