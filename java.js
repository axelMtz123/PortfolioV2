gsap.registerPlugin(ScrollTrigger);

const homeLinks = document.querySelectorAll(".home-link");
const heroPage = document.querySelector("#hero");

homeLinks.forEach(link => {
  link.addEventListener("click", () => {
    const heroPageTop = heroPage.offsetTop;

    window.scrollTo({
      top: heroPageTop - 600,  
      behavior: "smooth",
    });
  });
});

const heroButton = document.querySelector (".hero-cta")
const contactsection = document.getElementById ("contact")

heroButton.addEventListener('click', () => {
  contactsection.scrollIntoView({ behavior: 'smooth' });
});             

const loaderTl = gsap.timeline ({ delay: 1, })

loaderTl
    .to(".loader-left span", {
        y: -30,
        duration: .6,
        ease: "power1.out",
        repeat: -1,     
        yoyo: true,      
        stagger: {
            each: .1,
            from: "right"
        }, 
        delay: 0,
    })
    .to(".loader-right", {
        rotate: "360deg",
        xPercent: 30,
        duration: 1,
        repeat: 1,
        yoyo: "true",
        ease: "power2.inOut"
    }, '<')

    .to (".loader-left", {
        xPercent: -100,
        duration: 1,
        delay: 1,
    })
    .to (".loader-right", {
        xPercent: 100,
        duration: 1,
    }, "<")
    .to (".loader", {
        yPercent: -100,
        duration: 1,
        delay: 1,
        onComplete() {
            document.querySelector(".loader").remove()
            }
    }, "<")


gsap.to ("header", {
    backgroundColor: "#0A0A05",
    opacity: .75,
    scrollTrigger: {
        trigger: "header",
        start: "top -10",
        scrub: 1,
    }
})

ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  pin: true,           
  pinSpacing: false, 
});

gsap.utils.toArray(".panel").forEach(panel => {
    gsap.from(panel, {
        yPercent: 100,    
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
            trigger: panel,
            start: () => "top bottom",   
            end: () => "top 80%",       
            snap: false,               
        }
    });
});

const hamburger = document.querySelector (".hamburger")
const nav = document.querySelector ("nav")

if (window.innerWidth <= 500) {
    gsap.set(nav, { yPercent: -100, opacity: 0, pointerEvents: "none" })

    const navTl = gsap.timeline ({ paused: true, reversed: true})

        .to(".line-1", { y: 5, rotate: 45, transformOrigin: "center center", duration: 0.3}) 
        .to(".line-2", { y: -4, rotate: -45,  transformOrigin: "center center", duration: 0.3}, "<")

        .to (nav, {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            pointerEvents: "auto"
        }, "<")


        hamburger.addEventListener ("click", () => {
            navTl.reversed() ? navTl.play() : navTl.reverse();
        });
}

gsap.to (".changing-circle", {
    color: "#6A331D",
    repeat: -1,
    yoyo: true,
    duration: 1
})

const flipTexts = document.querySelector(".flip-text")
const texts = ["THE SKIN", "THE STUDIO", "THE WEB"]
let index = 0;

const textChangeTl = gsap.timeline({ paused: true });

function flipText() {
  const next = (index + 1) % texts.length;

  gsap.to(flipTexts, {
    rotateX: 0,
    opacity: 0,
    duration: 0.25,
    ease: "power1.in",
    onComplete: () => {
      flipTexts.textContent = texts[next];

      gsap.to(flipTexts, {
        rotateX: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power1.out",
      });
    }
  });

  index = next;
}


setInterval(flipText, 3000);

gsap.to (".marquee-track span", {
    xPercent: -100,
    duration: 20,
    ease: "linear",
    repeat: -1,
})

if (window.innerWidth >= 600) {
    const hoverImg = document.getElementById ("hover-img")
    document.querySelectorAll (".work-card").forEach (card => {
        card.addEventListener ("mousemove", (e) => {
            hoverImg.src = card.dataset.img;
            hoverImg.style.opacity = 1;

            hoverImg.style.left = e.clientX + "px";
            hoverImg.style.top = e.clientY + "px";
        })
        card.addEventListener ("click", () => {
            card.addEventListener("mousemove" ()) ? hoverImg.style.opacity = 0 : hoverImg.style.opacity = 1;
        }) 
        card.addEventListener ("mouseleave", () => {
            hoverImg.style.opacity = 0;
        })
    })

    const cards = gsap.utils.toArray(".stack-card")

    const stackTl = gsap.timeline ({ 
        scrollTrigger: {
            trigger: ".services",
            start: "top top",
            end: () => "+=" + (cards.length - 1) * window.innerHeight,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        }
    });

    cards.forEach ((card, i) => {
        stackTl.from (card, {
            yPercent: 150,
            opacity: 0,
            duration: .3,
        })

        .to(card, {
            y: i * 80,
            scale: 1 + i * 0.025,
            duration: .5,
        }, "<")
    })

}

document.querySelectorAll (".workInner-card").forEach (card => {
    let isExpanded = false


    card.addEventListener ("click", () => {
        isExpanded
            ? gsap.to(card, { height: 40, duration: 0.4 })
            : gsap.to(card, { height: "auto", duration: 0.4 });

        isExpanded = !isExpanded;
    })
})
