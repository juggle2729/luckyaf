import {lazyLoading} from './lazyLoading'

export default {
  meta: {
    label: '用户',
    icon: 'fa-laptop',
    expanded: true
  },

  children: [
    {
      name: '查找',
      path: '/user/search',
      component: lazyLoading('ui/Buttons')
    },
    {
      name: '流失',
      path: '/user/lose',
      component: lazyLoading('ui/Form')
    },
    {
      name: '召回',
      path: '/user/recall',
      component: lazyLoading('ui/Typography')
    },
    {
      name: '自有用户',
      path: '/user/agent',
      component: lazyLoading('ui/Typography')
    }
  ]
}
