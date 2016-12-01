import {lazyLoading} from './lazyLoading'

export default {
  meta: {
    label: '商品',
    icon: 'fa-laptop',
    expanded: true
  },

  children: [
    {
      name: '商品模版',
      path: '/product/template',
      component: lazyLoading('ui/Buttons')
    },
    {
      name: '货源',
      path: '/product/source',
      component: lazyLoading('ui/Form')
    },
    {
      name: '商品分类',
      path: '/product/category',
      component: lazyLoading('ui/Typography')
    }
  ]
}
