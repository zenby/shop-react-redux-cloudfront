import * as Yup from 'yup'

export type Product = {
  id: string
  title: string
  description: string
  price: number
  image: string
}

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  image: Yup.string(),
  amount: Yup.number(),
  price: Yup.number().required(),
})
