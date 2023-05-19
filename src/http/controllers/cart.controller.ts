import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid'
import CartService from '../../database/services/cart.service';
import ProductService from '../../database/services/product.srv';
import SuccessMsgResponse from '../responses/ApiResponse/SuccessMsgResponse ';
import NotFoundResponse from '../responses/ApiResponse/NotFoundResponse ';
import { logger } from '../../utils/loggers';
import SuccessResponse from '../responses/ApiResponse/SuccessResponse';

export default class CartController {
  private _cartService : CartService = new CartService();

  private _productService = ProductService

  public getCarts = async (req: Request, res: Response) => {
    const carts = await this._cartService.index()

    return new SuccessResponse('success', carts).send(res)
  }

  public insertToCart = async (req: Request, res: Response) => {
    const { id: productId } = req.params
    const product = await this._productService.findProduct(productId)
    if (!product) return new NotFoundResponse('product not found').send(res)
    const { user } = res.locals;
    const cart = {
      cart_id: uuid(),
      product_id: productId,
      user_id: user._doc.user_id,
      count: 1,
    }
    logger.info(`cart controlrt${this._cartService}`)
    await this._cartService.addToCart(cart)
    return new SuccessMsgResponse('cart inserted').send(res)
  }
}
