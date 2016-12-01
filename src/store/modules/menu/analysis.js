import {lazyLoading} from './lazyLoading'

export default {
  meta: {
    label: '数据统计',
    icon: 'fa-laptop',
    expanded: true
  },

  children: [
    {
      name: '整体',
      path: '/analysis/overview',
      component: lazyLoading('ui/Buttons')
    },
    {
      name: '商品',
      path: '/analysis/product',
      component: lazyLoading('ui/Form')
    },
    {
      name: '中奖',
      path: '/analysis/award',
      component: lazyLoading('ui/Typography')
    },
    {
      name: '充值',
      path: '/analysis/recharge',
      component: lazyLoading('ui/Typography')
    }
  ]
}
