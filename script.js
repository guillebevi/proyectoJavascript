const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
//---CATEGORIAS---//
const botonesCategorias = document.querySelectorAll (".category");
//---MENU HAMBURGUESA---//
const botonHamburguesa = document.querySelector(".boton-hamburguesa")
const navMenu = document.querySelector(".navmenu")
//---API---//
const form = document.getElementById('form');
const cityInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
const waitMsg = document.querySelector('.wait');



let carrito = []

let cities = JSON.parse(localStorage.getItem('cities')) || [];



//--------- LOCAL STORAGE -------------//


document.addEventListener('DOMContentLoaded',() => {
  if (localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()

  }

});

const saveLocalStorage = citiesList => {
  localStorage.setItem('cities', JSON.stringify(citiesList));
};


//---------------- STOCK ------------------//

function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = "" ;

  productosElegidos.forEach(producto => {

  const div = document.createElement("div")
   div.classList.add("producto")
   div.innerHTML = `
  <div id="productos">
      <img src=${producto.img} alt="">
    <div class="bajoimg">
      <h3>${producto.nombre}</h3>
      <p class="precioProducto">Precio: $  ${producto.precio}</p>
      <button id="agregar${producto.id}" class="boton-agregarcarrito">AGREGAR AL CARRITO</button>
    </div>
  </div>
  `

  contenedorProductos.append(div);


    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id)

      })

  })
 }



//-------- FUNCION FILTRAR POR CATEGORIAS ---------//


botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {

    botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
          const productoCategoria = stockProductos.find(producto => producto.categoria.id === e.currentTarget.id);

          const productosBoton = stockProductos.filter(producto => producto.categoria.id === e.currentTarget.id);
          cargarProductos(productosBoton);
      } else {
          cargarProductos(stockProductos);
      }
  })


});


//------------ FUNCION AGREGAR AL CARRITO ---------//

 const agregarAlCarrito = (prodId) => {

  const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
      const prod = carrito.map (prod => {
        if (prod.id === prodId){
            prod.cantidad++
        }
      })
    } else {
        const item = stockProductos.find ((prod) => prod.id === prodId)
        carrito.push(item)

  }

 actualizarCarrito()

}


 //-------- FUNCION ACTUALIZAR CARRITO -----------//

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = ""

  carrito.forEach((prod) => {
     const div = document.createElement('div')
   div.className = ('productoEnCarrito')
   div.innerHTML = `
    <p class="p-color">${prod.nombre}</p>
    <p class="precio-color">PRECIO: $ ${prod.precio}</p>
    <p>CANTIDAD: <span id="cantidad">${prod.cantidad}</span></p>
   <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fa-solid fa-trash"></i></button>

  `

 contenedorCarrito.appendChild(div)

 localStorage.setItem('carrito', JSON.stringify(carrito))

   })
   contadorCarrito.innerText = carrito.length
   precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.cantidad * prod.precio, 0)

 }



//---- FUNCION ELIMINAR DEL CARRITO --------//

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()

}

//-------- FUNCION VACIAR CARRITO ---------//

botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})

//--------- MENU HAMBURGUESA -------------//

botonHamburguesa.addEventListener("click",() => {
  navMenu.classList.toggle("navmenu_visible");
} )




// // -----  CARRUSEL --------- //

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel-container").forEach((carousel) => {
    insertNumbers(carousel);

    carousel.querySelector(".prev").addEventListener("click", (e) => {
      minusItem(carousel);
    });

    carousel.querySelector(".next").addEventListener("click", () => {
      plusItem(carousel);
    });

    insertDots(carousel);

    carousel.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        let item = Array.prototype.indexOf.call(
          e.target.parentNode.children,
          e.target
        );

        showItems(carousel, item);
      });
    });

    showItems(carousel, 0);
  });
});

function insertNumbers(carousel) {
  const length = carousel.querySelectorAll(".item").length;
  for (let i = 0; i < length; i++) {
    const nmbr = document.createElement("div");
    nmbr.classList.add("numbertext");
    nmbr.innerText = i + 1 + " / " + length;

    carousel.querySelectorAll(".item")[i].append(nmbr);
  }
}

function insertDots(carousel) {
  const dots = document.createElement("div");
  dots.classList.add("dots");

  carousel.append(dots);

  carousel.querySelectorAll(".item").forEach((elem) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    carousel.querySelector(".dots").append(dot);
  });
}

function plusItem(carousel) {
  let item = currentItem(carousel);

  carousel
    .querySelectorAll(".item")
    [item].nextElementSibling.classList.contains("item")
    ? showItems(carousel, item + 1)
    : showItems(carousel, 0);
}

function minusItem(carousel) {
  let item = currentItem(carousel);

  carousel.querySelectorAll(".item")[item].previousElementSibling != null
    ? showItems(carousel, item - 1)
    : showItems(carousel, carousel.querySelectorAll(".item").length - 1);
}

function currentItem(carousel) {
  return [...carousel.querySelectorAll(".item")].findIndex(
    (item) => item.style.display == "block"
  );
}

function showItems(carousel, item) {
  if (carousel.querySelectorAll(".item")[currentItem(carousel)] != undefined)
    carousel.querySelectorAll(".item")[currentItem(carousel)].style.display =
      "none";
  carousel.querySelectorAll(".item")[item].style.display = "block";

  if (carousel.querySelector(".dot.active") != null)
    carousel.querySelector(".dot.active").classList.remove("active");
  carousel.querySelectorAll(".dot")[item].classList.add("active");
}


//  ...........  API CLIMA  .......... //

// // -----  FUNCION BUSCAR CIUDAD --------- //
const searchCity = async e => {
  e.preventDefault()

  const searchCity = cityInput.value.trim()
if (searchCity === '') {
  alert("Ingresa una ciudad")
  return;
}

const fetchedCity = await requestCity(searchCity)

if (!fetchedCity.id) {
  alert('La ciudad ingresada no existe');
  form.reset();
  return;
} else if (cities.some(city => city.id === fetchedCity.id)) {
  alert('Ya se esta mostrando el clima de esa ciudad');
  form.reset();
  return;
}

cities = [ fetchedCity, ...cities]
renderCitiesList(cities);
saveLocalStorage(cities);
hideWaitMsg(cities);
form.reset();
};

// // -----  FUNCION PARA RENDERIZAR --------- //

const renderCity = city => {

  return `
  <div class="card-clima">
            <i class="fa-solid fa-x close" data-id="${city.id}"></i>
            <div class="clima-info">
              <h3 class="info-title2">${city.name}</h3>
              <p class="info-subtitle">${city.weather[0].description}</p>
              <div class="info-temp">
                <span class="temp">${convertCelsius(city.main.temp)}°</span>
                <span class="st">${convertCelsius(city.main.feels_like)} ST</span>
              </div>
            </div>
            <div class="clima-img"><img src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png"/></div>
            <div class="clima-temp">
              <div class="clima-max-min">
                <span class="clima-max"
                  ><i class="fa-solid fa-arrow-up-long"></i>Max:${convertCelsius(city.main.temp_max)}</span
                >
                <span class="clima-min"
                  ><i class="fa-solid fa-arrow-down-long"></i>Min:${convertCelsius(city.main.temp_min)}</span
                >
              </div>
              <span class="clima-humedad">Humedad ${city.main.humidity} %</span>
            </div>
          </div>
   
  `
};


const renderCitiesList = citiesList => {
  cardContainer.innerHTML = citiesList.map(city => renderCity(city)).join('');
};


// // -----  FUNCION OCULTAR MENSAJE --------- //

const hideWaitMsg = citiesList => {
  if (citiesList.length !== 0) {
    waitMsg.classList.add('hidden');
    return;
  }
  waitMsg.classList.remove('hidden');
};


// // -----  FUNCION CAMBIAR TIPO DE GRADOS --------- //

const convertCelsius = kelvin => {
  let celsius = Math.round(kelvin - 273.15);
  return celsius;
};




// // -----  FUNCION ELIMINAR CIUDAD --------- //
const removeCity = e => {
  
  if (!e.target.classList.contains('close')) return;
  const filterId = Number(e.target.dataset.id);
  if (window.confirm('¿Estas seguro que lo queres eliminar?'))

  { 
    cities = cities.filter(city => city.id !== filterId);
    
    renderCitiesList(cities);
    saveLocalStorage(cities);
    hideWaitMsg(cities);

  }
};
// // -----  FUNCION INICIALIZADORA --------- //

const init = () => {
  renderCitiesList(cities);
  hideWaitMsg(cities);
  form.addEventListener('submit', searchCity);
  cardContainer.addEventListener('click', removeCity);
};
init();