import { observable, autorun } from 'mobx'

// 定义TAB BAR DATA
const tabBarStore = observable([
    { title: '商城', iconPrefixClass:'fa', iconType:'home', path:'/pages/shop/shop' },
    { title: '促销', iconPrefixClass:'fa', iconType:'dollar', path:'/pages/promotion/promotion' },
    { title: '钱包', iconPrefixClass:'fa', iconType:'credit-card', path:'/pages/wallet/wallet' },
    { title: '订单', dot: true, iconPrefixClass:'fa', iconType:'reorder', path:'/pages/order/order' },
    { title: '我的', iconPrefixClass:'fa', iconType:'user-o', path:'/pages/user/user' }
  ]);

/** TODO
 * 当Value值改变时，机会执行AUTO RUN函数
 */
autorun(() => {
  console.log("Tab Bar Remaining:", tabBarStore
    .map(item => item.title)
    .join(", ")
  );
});

export default tabBarStore
