/* ==========================================
   CampusMate AI - Landing Page
========================================== */

const getStartedBtn = document.getElementById("getStartedBtn");

if(getStartedBtn){

    getStartedBtn.addEventListener("click",function(){

        window.location.href="login.html";

    });

}

const learnMoreBtn = document.getElementById("learnMoreBtn");

if(learnMoreBtn){

    learnMoreBtn.addEventListener("click",function(){

        document.querySelector(".features").scrollIntoView({

            behavior:"smooth"

        });

    });

}

/* ==========================================
   Navbar Navigation
========================================== */

const navItems=document.querySelectorAll("nav ul li");

navItems.forEach(function(item){

    item.style.cursor="pointer";

    item.addEventListener("click",function(){

        const text=item.textContent.trim().toLowerCase();

        if(text==="home"){

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

        else if(text==="features"){

            document.querySelector(".features").scrollIntoView({

                behavior:"smooth"

            });

        }

        else if(text==="about"){

            alert("CampusMate AI is a student productivity platform developed by Jaiveer Sharma.");

        }

        else if(text==="contact"){

            alert("Email: jaiveer@example.com");

        }

    });

});

/* ==========================================
   Hero Animation
========================================== */

window.addEventListener("load",function(){

    const hero=document.querySelector(".hero");

    if(hero){

        hero.style.opacity="0";

        hero.style.transform="translateY(30px)";

        setTimeout(function(){

            hero.style.transition="all .8s ease";

            hero.style.opacity="1";

            hero.style.transform="translateY(0px)";

        },150);

    }

});

