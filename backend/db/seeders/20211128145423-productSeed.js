'use strict';

let productDummyJSON = JSON.stringify([
  {
    'tier': 1,
    'price':1,
    'description':'Nothing'
  },
  {
    'tier':2,
    'price': 10,
    'description': '20% Discount on future products'
  },
  {
    'tier':3,
    'price': 20,
    'description':'Product prototypes'
  }
])


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      title:'iShoes',
      user_id: 1,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies aliquet bibendum. Aliquam maximus lacus eu massa lacinia, vel dapibus justo facilisis. Donec porttitor elementum commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed lacinia odio. Aenean sollicitudin pharetra eros, vitae mollis turpis ornare vel. Proin id libero in dolor rutrum luctus efficitur et est. Maecenas quis erat pulvinar, vulputate libero eget, tempor eros. Duis neque est, mattis sit amet sapien et, vehicula efficitur lectus. Morbi id tempus nibh. Donec pulvinar velit et mi feugiat consequat. Sed ultricies rhoncus dolor, quis feugiat sem vestibulum eu. Proin et lobortis ante. Fusce enim augue, varius bibendum ornare et, gravida quis metus. Nunc ut nulla nec metus consectetur tempor a vel odio.

      Pellentesque nunc enim, ullamcorper ut libero vitae, ornare consequat arcu. Mauris condimentum massa sit amet tellus vulputate tempus. Integer ante sem, porta sit amet dui ut, volutpat bibendum nunc. Vivamus ipsum nulla, tempus ut accumsan quis, placerat vel diam. Integer at mauris turpis. Curabitur non laoreet ligula. Mauris risus neque, placerat non nisi et, viverra scelerisque arcu. Praesent nisl mauris, imperdiet in malesuada a, dapibus consequat leo. Vestibulum nec augue enim. Curabitur consectetur, lorem vitae gravida tristique, metus nisl placerat ante, quis placerat neque lacus vel massa. Duis lacinia nec ex sit amet fringilla. Sed sit amet libero eu tellus luctus consequat nec nec dolor. Fusce at orci sed ante blandit pellentesque.
      
      Donec iaculis placerat porta. Etiam sit amet ultrices massa, ac iaculis diam. Vestibulum sagittis tempus vestibulum. Nulla eget lacus quis lectus molestie volutpat nec a magna. Nulla non purus pretium diam aliquam ultricies et ut est. Donec malesuada, velit eu commodo maximus, elit massa gravida felis, quis tempus arcu mauris nec lacus. Ut tincidunt lacus ac tellus interdum, at pellentesque justo mollis. Donec mollis massa sit amet tempus luctus. Integer sed scelerisque tellus.
      
      Phasellus fermentum sollicitudin venenatis. Praesent ac dignissim ex, a pulvinar ipsum. Sed ut nibh vehicula, convallis nibh non, consequat magna. Curabitur quis fermentum quam. Etiam ut metus suscipit enim efficitur blandit quis vitae ligula. Suspendisse ipsum mauris, faucibus ac orci nec, posuere tincidunt ipsum. Proin mi lectus, semper nec sapien quis, faucibus eleifend urna. Nam urna tortor, viverra nec dui ut, suscipit tempus metus. Vestibulum sit amet lacus eget mi congue dapibus nec vitae ante. Donec quam lorem, mattis vel quam ac, varius suscipit purus.
      
      Pellentesque auctor augue felis. Aenean at interdum arcu. Nulla at tincidunt sapien. Proin vehicula non ipsum quis congue. Nulla mattis eu justo eu semper. Etiam at felis massa. Sed ac ex porttitor, vehicula dui id, vestibulum eros. Nunc eget sapien quam. Cras purus augue, ultrices pulvinar velit eu, vehicula condimentum dui.`,
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum leo, pellentesque varius fringilla ac, interdum ut purus. Vestibulum sed.`,
      funding: 0,
      investors: 0,
      rewards:productDummyJSON,
      tags:['Technology', 'Outdoors', 'Fashion'],
      image: 'https://i.imgur.com/fy50nPd.png',
    },
    {
      title:'iPhone',
      user_id: 4,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies aliquet bibendum. Aliquam maximus lacus eu massa lacinia, vel dapibus justo facilisis. Donec porttitor elementum commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed lacinia odio. Aenean sollicitudin pharetra eros, vitae mollis turpis ornare vel. Proin id libero in dolor rutrum luctus efficitur et est. Maecenas quis erat pulvinar, vulputate libero eget, tempor eros. Duis neque est, mattis sit amet sapien et, vehicula efficitur lectus. Morbi id tempus nibh. Donec pulvinar velit et mi feugiat consequat. Sed ultricies rhoncus dolor, quis feugiat sem vestibulum eu. Proin et lobortis ante. Fusce enim augue, varius bibendum ornare et, gravida quis metus. Nunc ut nulla nec metus consectetur tempor a vel odio.

      Pellentesque nunc enim, ullamcorper ut libero vitae, ornare consequat arcu. Mauris condimentum massa sit amet tellus vulputate tempus. Integer ante sem, porta sit amet dui ut, volutpat bibendum nunc. Vivamus ipsum nulla, tempus ut accumsan quis, placerat vel diam. Integer at mauris turpis. Curabitur non laoreet ligula. Mauris risus neque, placerat non nisi et, viverra scelerisque arcu. Praesent nisl mauris, imperdiet in malesuada a, dapibus consequat leo. Vestibulum nec augue enim. Curabitur consectetur, lorem vitae gravida tristique, metus nisl placerat ante, quis placerat neque lacus vel massa. Duis lacinia nec ex sit amet fringilla. Sed sit amet libero eu tellus luctus consequat nec nec dolor. Fusce at orci sed ante blandit pellentesque.
      
      Donec iaculis placerat porta. Etiam sit amet ultrices massa, ac iaculis diam. Vestibulum sagittis tempus vestibulum. Nulla eget lacus quis lectus molestie volutpat nec a magna. Nulla non purus pretium diam aliquam ultricies et ut est. Donec malesuada, velit eu commodo maximus, elit massa gravida felis, quis tempus arcu mauris nec lacus. Ut tincidunt lacus ac tellus interdum, at pellentesque justo mollis. Donec mollis massa sit amet tempus luctus. Integer sed scelerisque tellus.
      
      Phasellus fermentum sollicitudin venenatis. Praesent ac dignissim ex, a pulvinar ipsum. Sed ut nibh vehicula, convallis nibh non, consequat magna. Curabitur quis fermentum quam. Etiam ut metus suscipit enim efficitur blandit quis vitae ligula. Suspendisse ipsum mauris, faucibus ac orci nec, posuere tincidunt ipsum. Proin mi lectus, semper nec sapien quis, faucibus eleifend urna. Nam urna tortor, viverra nec dui ut, suscipit tempus metus. Vestibulum sit amet lacus eget mi congue dapibus nec vitae ante. Donec quam lorem, mattis vel quam ac, varius suscipit purus.
      
      Pellentesque auctor augue felis. Aenean at interdum arcu. Nulla at tincidunt sapien. Proin vehicula non ipsum quis congue. Nulla mattis eu justo eu semper. Etiam at felis massa. Sed ac ex porttitor, vehicula dui id, vestibulum eros. Nunc eget sapien quam. Cras purus augue, ultrices pulvinar velit eu, vehicula condimentum dui.`,
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum leo, pellentesque varius fringilla ac, interdum ut purus. Vestibulum sed.`,
      funding: 0,
      investors: 0,
      rewards:productDummyJSON,
      tags:['Technology', 'Video Games', 'Software', 'Hardware'],
      image: 'https://i.imgur.com/gM0YxHn.png',
    },
    {
      title:'Flower Vase',
      user_id: 9,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies aliquet bibendum. Aliquam maximus lacus eu massa lacinia, vel dapibus justo facilisis. Donec porttitor elementum commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed lacinia odio. Aenean sollicitudin pharetra eros, vitae mollis turpis ornare vel. Proin id libero in dolor rutrum luctus efficitur et est. Maecenas quis erat pulvinar, vulputate libero eget, tempor eros. Duis neque est, mattis sit amet sapien et, vehicula efficitur lectus. Morbi id tempus nibh. Donec pulvinar velit et mi feugiat consequat. Sed ultricies rhoncus dolor, quis feugiat sem vestibulum eu. Proin et lobortis ante. Fusce enim augue, varius bibendum ornare et, gravida quis metus. Nunc ut nulla nec metus consectetur tempor a vel odio.

      Pellentesque nunc enim, ullamcorper ut libero vitae, ornare consequat arcu. Mauris condimentum massa sit amet tellus vulputate tempus. Integer ante sem, porta sit amet dui ut, volutpat bibendum nunc. Vivamus ipsum nulla, tempus ut accumsan quis, placerat vel diam. Integer at mauris turpis. Curabitur non laoreet ligula. Mauris risus neque, placerat non nisi et, viverra scelerisque arcu. Praesent nisl mauris, imperdiet in malesuada a, dapibus consequat leo. Vestibulum nec augue enim. Curabitur consectetur, lorem vitae gravida tristique, metus nisl placerat ante, quis placerat neque lacus vel massa. Duis lacinia nec ex sit amet fringilla. Sed sit amet libero eu tellus luctus consequat nec nec dolor. Fusce at orci sed ante blandit pellentesque.
      
      Donec iaculis placerat porta. Etiam sit amet ultrices massa, ac iaculis diam. Vestibulum sagittis tempus vestibulum. Nulla eget lacus quis lectus molestie volutpat nec a magna. Nulla non purus pretium diam aliquam ultricies et ut est. Donec malesuada, velit eu commodo maximus, elit massa gravida felis, quis tempus arcu mauris nec lacus. Ut tincidunt lacus ac tellus interdum, at pellentesque justo mollis. Donec mollis massa sit amet tempus luctus. Integer sed scelerisque tellus.
      
      Phasellus fermentum sollicitudin venenatis. Praesent ac dignissim ex, a pulvinar ipsum. Sed ut nibh vehicula, convallis nibh non, consequat magna. Curabitur quis fermentum quam. Etiam ut metus suscipit enim efficitur blandit quis vitae ligula. Suspendisse ipsum mauris, faucibus ac orci nec, posuere tincidunt ipsum. Proin mi lectus, semper nec sapien quis, faucibus eleifend urna. Nam urna tortor, viverra nec dui ut, suscipit tempus metus. Vestibulum sit amet lacus eget mi congue dapibus nec vitae ante. Donec quam lorem, mattis vel quam ac, varius suscipit purus.
      
      Pellentesque auctor augue felis. Aenean at interdum arcu. Nulla at tincidunt sapien. Proin vehicula non ipsum quis congue. Nulla mattis eu justo eu semper. Etiam at felis massa. Sed ac ex porttitor, vehicula dui id, vestibulum eros. Nunc eget sapien quam. Cras purus augue, ultrices pulvinar velit eu, vehicula condimentum dui.`,
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum leo, pellentesque varius fringilla ac, interdum ut purus. Vestibulum sed.`,
      funding: 0,
      investors: 0,
      rewards:productDummyJSON,
      tags:['Outdoors', 'Art', 'Tool'],
      image: 'https://i.imgur.com/38wphVy.png',
    },
    {
      title:'Jetpack',
      user_id: 7,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies aliquet bibendum. Aliquam maximus lacus eu massa lacinia, vel dapibus justo facilisis. Donec porttitor elementum commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed lacinia odio. Aenean sollicitudin pharetra eros, vitae mollis turpis ornare vel. Proin id libero in dolor rutrum luctus efficitur et est. Maecenas quis erat pulvinar, vulputate libero eget, tempor eros. Duis neque est, mattis sit amet sapien et, vehicula efficitur lectus. Morbi id tempus nibh. Donec pulvinar velit et mi feugiat consequat. Sed ultricies rhoncus dolor, quis feugiat sem vestibulum eu. Proin et lobortis ante. Fusce enim augue, varius bibendum ornare et, gravida quis metus. Nunc ut nulla nec metus consectetur tempor a vel odio.

      Pellentesque nunc enim, ullamcorper ut libero vitae, ornare consequat arcu. Mauris condimentum massa sit amet tellus vulputate tempus. Integer ante sem, porta sit amet dui ut, volutpat bibendum nunc. Vivamus ipsum nulla, tempus ut accumsan quis, placerat vel diam. Integer at mauris turpis. Curabitur non laoreet ligula. Mauris risus neque, placerat non nisi et, viverra scelerisque arcu. Praesent nisl mauris, imperdiet in malesuada a, dapibus consequat leo. Vestibulum nec augue enim. Curabitur consectetur, lorem vitae gravida tristique, metus nisl placerat ante, quis placerat neque lacus vel massa. Duis lacinia nec ex sit amet fringilla. Sed sit amet libero eu tellus luctus consequat nec nec dolor. Fusce at orci sed ante blandit pellentesque.
      
      Donec iaculis placerat porta. Etiam sit amet ultrices massa, ac iaculis diam. Vestibulum sagittis tempus vestibulum. Nulla eget lacus quis lectus molestie volutpat nec a magna. Nulla non purus pretium diam aliquam ultricies et ut est. Donec malesuada, velit eu commodo maximus, elit massa gravida felis, quis tempus arcu mauris nec lacus. Ut tincidunt lacus ac tellus interdum, at pellentesque justo mollis. Donec mollis massa sit amet tempus luctus. Integer sed scelerisque tellus.
      
      Phasellus fermentum sollicitudin venenatis. Praesent ac dignissim ex, a pulvinar ipsum. Sed ut nibh vehicula, convallis nibh non, consequat magna. Curabitur quis fermentum quam. Etiam ut metus suscipit enim efficitur blandit quis vitae ligula. Suspendisse ipsum mauris, faucibus ac orci nec, posuere tincidunt ipsum. Proin mi lectus, semper nec sapien quis, faucibus eleifend urna. Nam urna tortor, viverra nec dui ut, suscipit tempus metus. Vestibulum sit amet lacus eget mi congue dapibus nec vitae ante. Donec quam lorem, mattis vel quam ac, varius suscipit purus.
      
      Pellentesque auctor augue felis. Aenean at interdum arcu. Nulla at tincidunt sapien. Proin vehicula non ipsum quis congue. Nulla mattis eu justo eu semper. Etiam at felis massa. Sed ac ex porttitor, vehicula dui id, vestibulum eros. Nunc eget sapien quam. Cras purus augue, ultrices pulvinar velit eu, vehicula condimentum dui.`,
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum leo, pellentesque varius fringilla ac, interdum ut purus. Vestibulum sed.`,
      funding: 0,
      investors: 0,
      rewards:productDummyJSON,
      tags:['Outdoors', 'Fashion', 'Hardware', 'Entertainment'],
      image: 'https://i.imgur.com/BtjHEv3.png',
    },
    {
      title:'Hotdog',
      user_id: 2,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies aliquet bibendum. Aliquam maximus lacus eu massa lacinia, vel dapibus justo facilisis. Donec porttitor elementum commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed lacinia odio. Aenean sollicitudin pharetra eros, vitae mollis turpis ornare vel. Proin id libero in dolor rutrum luctus efficitur et est. Maecenas quis erat pulvinar, vulputate libero eget, tempor eros. Duis neque est, mattis sit amet sapien et, vehicula efficitur lectus. Morbi id tempus nibh. Donec pulvinar velit et mi feugiat consequat. Sed ultricies rhoncus dolor, quis feugiat sem vestibulum eu. Proin et lobortis ante. Fusce enim augue, varius bibendum ornare et, gravida quis metus. Nunc ut nulla nec metus consectetur tempor a vel odio.

      Pellentesque nunc enim, ullamcorper ut libero vitae, ornare consequat arcu. Mauris condimentum massa sit amet tellus vulputate tempus. Integer ante sem, porta sit amet dui ut, volutpat bibendum nunc. Vivamus ipsum nulla, tempus ut accumsan quis, placerat vel diam. Integer at mauris turpis. Curabitur non laoreet ligula. Mauris risus neque, placerat non nisi et, viverra scelerisque arcu. Praesent nisl mauris, imperdiet in malesuada a, dapibus consequat leo. Vestibulum nec augue enim. Curabitur consectetur, lorem vitae gravida tristique, metus nisl placerat ante, quis placerat neque lacus vel massa. Duis lacinia nec ex sit amet fringilla. Sed sit amet libero eu tellus luctus consequat nec nec dolor. Fusce at orci sed ante blandit pellentesque.
      
      Donec iaculis placerat porta. Etiam sit amet ultrices massa, ac iaculis diam. Vestibulum sagittis tempus vestibulum. Nulla eget lacus quis lectus molestie volutpat nec a magna. Nulla non purus pretium diam aliquam ultricies et ut est. Donec malesuada, velit eu commodo maximus, elit massa gravida felis, quis tempus arcu mauris nec lacus. Ut tincidunt lacus ac tellus interdum, at pellentesque justo mollis. Donec mollis massa sit amet tempus luctus. Integer sed scelerisque tellus.
      
      Phasellus fermentum sollicitudin venenatis. Praesent ac dignissim ex, a pulvinar ipsum. Sed ut nibh vehicula, convallis nibh non, consequat magna. Curabitur quis fermentum quam. Etiam ut metus suscipit enim efficitur blandit quis vitae ligula. Suspendisse ipsum mauris, faucibus ac orci nec, posuere tincidunt ipsum. Proin mi lectus, semper nec sapien quis, faucibus eleifend urna. Nam urna tortor, viverra nec dui ut, suscipit tempus metus. Vestibulum sit amet lacus eget mi congue dapibus nec vitae ante. Donec quam lorem, mattis vel quam ac, varius suscipit purus.
      
      Pellentesque auctor augue felis. Aenean at interdum arcu. Nulla at tincidunt sapien. Proin vehicula non ipsum quis congue. Nulla mattis eu justo eu semper. Etiam at felis massa. Sed ac ex porttitor, vehicula dui id, vestibulum eros. Nunc eget sapien quam. Cras purus augue, ultrices pulvinar velit eu, vehicula condimentum dui.`,
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum leo, pellentesque varius fringilla ac, interdum ut purus. Vestibulum sed.`,
      funding: 0,
      investors: 0,
      rewards:productDummyJSON,
      tags:['Food', 'Free', 'Event', 'Entertainment'],
      image: 'https://i.imgur.com/JUGigTJ.png',
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
