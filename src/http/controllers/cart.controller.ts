import { Request, Response } from 'express';
import { Types } from 'mongoose';
import CartServices from '../../database/services/cart.services';
import ProductService from '../../database/services/product.srv';
import SuccessMsgResponse from '../responses/ApiResponse/SuccessMsgResponse';
import NotFoundResponse from '../responses/ApiResponse/NotFoundResponse';
import { logger } from '../../utils/loggers';
import SuccessResponse from '../responses/ApiResponse/SuccessResponse';
import CartType from '../../database/types/cart.type';

export default class CartController {
  private _cartService : CartServices = new CartServices();

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
      product_id: productId,
      user_id: user._doc._id,
      count: 1,
    }
    await this._cartService.addToCart(cart as CartType)
    return new SuccessMsgResponse('cart inserted').send(res)
  }

  public updateCart = async (req: Request, res: Response) => {
    const { id: cartId } = req.params
    const { count } = req.body
    const cart = await this._cartService.veryfyCartUser(cartId, res.locals.user._doc.user_id)
    if (!cart) return new NotFoundResponse('cart not found').send(res)
    await this._cartService.addCountProduct(new Types.ObjectId(cartId), count)
    return new SuccessMsgResponse('cart updated').send(res)
  }

  public deleteCartUser = async (req: Request, res: Response) => {
    const { id: cartId } = req.params
    const { user } = res.locals
    const cart = await this._cartService.veryfyCartUser(cartId, user.user_id)
    logger.info(`${cart}`)
    if (!cart) return new NotFoundResponse('cart not found').send(res)
    await this._cartService.removeFromCart(cartId)
    return new SuccessMsgResponse('cart deleted').send(res)
  }

  public getCartsUser = async (req: Request, res: Response) => {
    const { user } = res.locals
    const carts = await this._cartService.userCarts(user._doc._id)
    return new SuccessResponse('success', carts).send(res)
  }
}
