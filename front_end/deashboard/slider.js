
// // Inicialização do Swiper para produtos
// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

// // Inicialização do Swiper para esportes
// var esportesSwiper = new Swiper(".esportesSwiper", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

// // Filtro de categorias
// document.addEventListener('DOMContentLoaded', function() {
//   const tabBtns = document.querySelectorAll('.tab-btn');
//   const slides = document.querySelectorAll('.swiper-slide');

//   tabBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       // Remove active class from all buttons
//       tabBtns.forEach(b => b.classList.remove('active'));
//       // Add active class to clicked button
//       btn.classList.add('active');
      
//       const category = btn.getAttribute('data-category');
      
//       // Update title
//       document.querySelector('.titulo-categoria').textContent = 'ESPORTES DE ' + category.toUpperCase();
      
//       // Filter slides
//       slides.forEach(slide => {
//         if (slide.getAttribute('data-category') === category) {
//           slide.style.display = 'block';
//         } else {
//           slide.style.display = 'none';
//         }
//       });
      
//       // Update swiper
//       esportesSwiper.update();
//     });
//   });
// });


// Rseponsal pelos slides doo tipos de sport do site o primeiro slide  que é  rotativos automaticamente
// Inicialização do Swiper para produtos
const productSwiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  // Responsividade para diferentes tamanhos de tela
  breakpoints: {
    // Quando a largura da janela é >= 576px
    576: {
      slidesPerView: 1,
    },
    // Quando a largura da janela é >= 768px
    768: {
      slidesPerView: 1,
    },
    // Quando a largura da janela é >= 992px
    992: {
      slidesPerView: 1,
    },
    // Quando a largura da janela é >= 1200px
    1200: {
      slidesPerView: 1,
    },
  },
});

// Variável global para o Swiper de esportes
let esportesSwiper;

// Função para inicializar ou reinicializar o Swiper de esportes
function initEsportesSwiper() {
  // Destruir instância anterior se existir
  if (esportesSwiper) {
    esportesSwiper.destroy(true, true);
  }
  
  // Inicializar nova instância
  esportesSwiper = new Swiper(".esportesSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}

// Adicionar efeito de hover nos botões de compra
document.querySelectorAll('.btn-comprar').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.05)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

// Gerenciar as categorias de esportes
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar o Swiper de esportes
  initEsportesSwiper();
  
  // Verificar se as imagens carregaram corretamente
  const images = document.querySelectorAll('.produto-imagem img, .esporte-imagem img');
  
  images.forEach(img => {
    img.addEventListener('error', () => {
      const productName = img.alt;
      img.src = `https://placehold.co/300x300/e6f2ff/007bff?text=${productName.replace(/\s+/g, '+')}`;
    });
  });
  
  // Adicionar funcionalidade para os cards de esportes
  document.querySelectorAll('.esporte-card').forEach(card => {
    card.addEventListener('click', function() {
      const sportName = this.getAttribute('data-sport');
      document.querySelector('.titulo-loja').textContent = `Produtos para ${sportName}`;
      
      // Aqui você pode adicionar lógica para filtrar produtos por esporte
      alert(`Mostrando produtos para ${sportName}`);
    });
  });
  
  // Gerenciar as abas de categorias
  const tabButtons = document.querySelectorAll('.tab-btn');
  const swiperWrapper = document.querySelector('.esportesSwiper .swiper-wrapper');
  const allSlides = document.querySelectorAll('.esportesSwiper .swiper-slide');
  
  // Função para mostrar slides da categoria selecionada
  function showCategory(category) {
    // Esconder todos os slides primeiro
    allSlides.forEach(slide => {
      if (slide.getAttribute('data-category') !== category) {
        slide.classList.add('hidden-slide');
      } else {
        slide.classList.remove('hidden-slide');
      }
    });
    
    // Atualizar o título da categoria
    const categoryTitles = {
      'quadra': 'Esportes de Quadra',
      'areia': 'Esportes de Areia',
      'agua': 'Esportes Aquáticos',
      'radicais': 'Esportes Radicais',
      'inverno': 'Esportes de Inverno'
    };
    
    document.querySelector('.titulo-categoria').textContent = categoryTitles[category];
    
    // Reinicializar o Swiper para reconhecer os novos slides
    setTimeout(() => {
      initEsportesSwiper();
    }, 100);
  }
  
  // Adicionar evento de clique para cada botão de categoria
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover classe 'active' de todos os botões
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adicionar classe 'active' ao botão clicado
      this.classList.add('active');
      
      // Mostrar a categoria selecionada
      const category = this.getAttribute('data-category');
      showCategory(category);
    });
  });
  
  // Mostrar a categoria 'quadra' por padrão
  showCategory('quadra');
});



//js responsalvel  por controlar os carss de loja de equipamentos,loja de Suplementos Nutricionais ,slide de produtos esportivos,Acessórios Esportivos rotativos os slides


// // Inicialização do Swiper
// const swiper = new Swiper(".mySwiper", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false,
//   },
//   // Responsividade para diferentes tamanhos de tela
//   breakpoints: {
//     // Quando a largura da janela é >= 576px
//     576: {
//       slidesPerView: 1,
//     },
//     // Quando a largura da janela é >= 768px
//     768: {
//       slidesPerView: 1,
//     },
//     // Quando a largura da janela é >= 992px
//     992: {
//       slidesPerView: 1,
//     },
//     // Quando a largura da janela é >= 1200px
//     1200: {
//       slidesPerView: 1,
//     },
//   },
// });

// // Adicionar efeito de hover nos botões de compra
// document.querySelectorAll('.btn-comprar').forEach(button => {
//   button.addEventListener('mouseenter', () => {
//     button.style.transform = 'scale(1.05)';
//   });
  
//   button.addEventListener('mouseleave', () => {
//     button.style.transform = 'scale(1)';
//   });
// });

// // Verificar se as imagens carregaram corretamente
// document.addEventListener('DOMContentLoaded', () => {
//   const images = document.querySelectorAll('.produto-imagem img');
  
//   images.forEach(img => {
//     img.addEventListener('error', () => {
//       const productName = img.alt;
//       img.src = `https://placehold.co/300x300/e6f2ff/007bff?text=${productName.replace(/\s+/g, '+')}`;
//     });
//   });
// });



//js responsalvel  por controlar os carss de loja de equipamentos,loja de Suplementos Nutricionais ,slide de produtos esportivos,Acessórios Esportivos  Nao rotativo slides Manual
// //
// // Inicialização do Swiper
// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   breakpoints: {
//     // quando a largura da janela é >= 576px
//     576: {
//       slidesPerView: 1,
//     },
//     // quando a largura da janela é >= 768px
//     768: {
//       slidesPerView: 1,
//     },
//     // quando a largura da janela é >= 992px
//     992: {
//       slidesPerView: 1,
//     },
//     // quando a largura da janela é >= 1200px
//     1200: {
//       slidesPerView: 1,
//     },
//   },
// });

// // Adicionar funcionalidade aos botões de compra
// document.querySelectorAll('.btn-comprar').forEach(button => {
//   button.addEventListener('click', function() {
//     const productName = this.closest('.produto-card').querySelector('h3').textContent;
//     alert(`Produto "${productName}" adicionado ao carrinho!`);
//   });
// });

// // Adicionar funcionalidade ao ícone do carrinho
// document.querySelector('.carrinho').addEventListener('click', function() {
//   alert('Carrinho de compras aberto!');
// });
