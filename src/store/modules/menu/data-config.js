import {lazyLoading} from './lazyLoading'

export default {
  meta: {
    label: '数据配置',
    icon: 'fa-laptop',
    expanded: true
  },

  children: [
    {
      name: '审核模式开关',
      path: '/data_config/sensor_switch',
      component: lazyLoading('ui/Buttons')
    },
    {
      name: 'Banner',
      path: '/data_config/banner',
      component: lazyLoading('data_config/banner')
    },
    {
      name: 'Discovery',
      path: '/data_config/discovery',
      component: lazyLoading('ui/Typography')
    },
    {
      name: 'Loading',
      path: '/data_config/loading',
      component: lazyLoading('ui/Icons')
    },
    {
      name: 'Shortcut',
      path: '/data_config/shortcut',
      component: lazyLoading('ui/Typography')
    },
    {
      name: '版本配置',
      path: '/data_config/version',
      component: lazyLoading('ui/Typography')
    }
  ]
}
