$(() => {

    class Navigation{
        constructor(){
            this.menuBurgerBtn = $('.menuBurger')
            this.sideNavigationWrap = $('.sideNavigationWrap')
            this.isShow = false
            this.spanDuration = 100
            this.sideNavDuration = 200
            this.navLink = $('.navLink')
        }

        toggleMenu(){
            this.test = this.menuBurgerBtn
            this.menuBurgerBtn.on('click', () => {
                if(this.isShow === false){
                    // show sidenav
                    this.sideNavigationWrap.css({"display":"block"}).animate({opacity:1}, {duration:this.sideNavDuration, easing:"swing", complete:
                        function(){
                            $(this).children().animate({top:"71px"}, {duration:this.sideNavDuration, easing:"swing"})
                        }
                    })
                    // animate first span
                    this.menuBurgerBtn.children().eq(0).animate({top:"10px"}, {duration:this.spanDuration, easing:"swing"})
                    // animate third span
                    this.menuBurgerBtn.children().eq(2).animate({top:"10px"}, {duration:this.spanDuration, easing:"swing", complete:
                        function(){
                            // hide second span
                            $(this).prev().css({"opacity":0})
                            // rotate 1st and 3rd span
                            $(this).prev().prev().css({"transform":"rotate(45deg)"})
                            $(this).css({"transform":"rotate(-45deg)"})
                        }
                    })

                }else{
                    // hide sidenav
                    this.sideNavigationWrap.children().animate({top:"-999px"}, {duration:this.sideNavDuration, easing:"swing", complete:
                        function(){
                            $(this).parent().animate({opacity:0}, {duration:this.sideNavDuration, easing:"swing", complete:
                                function(){
                                    $(this).css({"display":"none"})
                                }
                            })
                        }
                    })
                    // reset rotation of 1st and 3rd span
                    this.menuBurgerBtn.children().eq(0).css({"transform":"rotate(0deg)"})
                    this.menuBurgerBtn.children().eq(2).css({"transform":"rotate(0deg)"})

                    setTimeout(() => {
                        // show 2nd span
                        this.menuBurgerBtn.children().eq(1).css({"opacity":1})
                        // animate top 1st span
                        this.menuBurgerBtn.children().eq(0).animate({top:"0px"}, {duration:this.spanDuration, easing:"swing"})
                        // animate top 3rd span
                        this.menuBurgerBtn.children().eq(2).animate({top:"20px"}, {duration:this.spanDuration, easing:"swing"})
                    }, 200)
                }
                // toggle isShow value
                this.isShow = !this.isShow
            })
        }

        resizeEvent(){
            $(window).on('resize', (e) => {
                if($(e.target).outerWidth() >= 600){
                    if(this.isShow === true){
                        // hide sidenav
                        this.sideNavigationWrap.children().animate({top:"-999px"}, {duration:this.sideNavDuration, easing:"swing", complete:
                            function(){
                                $(this).parent().animate({opacity:0}, {duration:this.sideNavDuration, easing:"swing", complete:
                                    function(){
                                        $(this).css({"display":"none"})
                                    }
                                })
                            }
                        })
                        // reset rotation of 1st and 3rd span
                        this.menuBurgerBtn.children().eq(0).css({"transform":"rotate(0deg)"})
                        this.menuBurgerBtn.children().eq(2).css({"transform":"rotate(0deg)"})

                        setTimeout(() => {
                            // show 2nd span
                            this.menuBurgerBtn.children().eq(1).css({"opacity":1})
                            // animate top 1st span
                            this.menuBurgerBtn.children().eq(0).animate({top:"0px"}, {duration:this.spanDuration, easing:"swing"})
                            // animate top 3rd span
                            this.menuBurgerBtn.children().eq(2).animate({top:"20px"}, {duration:this.spanDuration, easing:"swing"})
                        }, 200)

                        // toggle isShow value
                        this.isShow = !this.isShow
                    }
                }
            })
        }

        clickEvt(){
            this.navLink.on('click', (e) => {
                // e.preventDefault()
                let value = $(e.currentTarget).attr('href')
                // $(window).scrollTop($(value).offset().top);
                $(window).animate({scrollTop:$(value).offset().top}, 300)

                if($(e.currentTarget).parent().hasClass('sideNavigationContainer')){
                    if(this.isShow === true){
                        // hide sidenav
                        this.sideNavigationWrap.children().animate({top:"-999px"}, {duration:this.sideNavDuration, easing:"swing", complete:
                            function(){
                                $(this).parent().animate({opacity:0}, {duration:this.sideNavDuration, easing:"swing", complete:
                                    function(){
                                        $(this).css({"display":"none"})
                                    }
                                })
                            }
                        })
                        // reset rotation of 1st and 3rd span
                        this.menuBurgerBtn.children().eq(0).css({"transform":"rotate(0deg)"})
                        this.menuBurgerBtn.children().eq(2).css({"transform":"rotate(0deg)"})

                        setTimeout(() => {
                            // show 2nd span
                            this.menuBurgerBtn.children().eq(1).css({"opacity":1})
                            // animate top 1st span
                            this.menuBurgerBtn.children().eq(0).animate({top:"0px"}, {duration:this.spanDuration, easing:"swing"})
                            // animate top 3rd span
                            this.menuBurgerBtn.children().eq(2).animate({top:"20px"}, {duration:this.spanDuration, easing:"swing"})
                        }, 200)

                        // toggle isShow value
                        this.isShow = !this.isShow
                    }
                }
            })
        }
    }

    class Experience{
        constructor(){
            this.expBtn = $('.expBtn')
            this.expDetailsCont = $('.experienceDetailsContainer')
            this.dutyInd = 0
            this.portInd = 0
            this.animDuration = 200
        }

        enterAnimation(){
            const dutyAnimation = setInterval(() => {
                // animate duty one by one
                $('.duty').eq(this.dutyInd).animate({opacity:1, left:0}, {duration:this.animDuration, easing:"swing"})

                if(this.dutyInd === $('.duty').length){
                    // if all of items on the list finished animation

                    // set new duty index value to -1
                    this.dutyInd = -1
                    // clear timer stop iteration of duty animation then move on to portfolio link iteration
                    clearInterval(dutyAnimation)

                    const portAnimation = setInterval(() => {
                        // animate portfolio one by one
                        $('.portfolio').eq(this.portInd).animate({opacity:1, left:0}, {duration:this.animDuration, easing:"swing"})
                        if(this.portInd === $('.portfolio').length){
                            // if all of items on the list finished animation
                            // set new duty index value to -1
                            this.portInd = -1
                            // clear timer stop iteration
                            clearInterval(portAnimation)
                        } 
                        // increment index
                        this.portInd++
                    }, this.animDuration);
                }
                // increment index
                this.dutyInd++
            }, this.animDuration);
        }

        // experiment start
        // exitAnimation(){
        //     const portAnimation = setInterval(() => {
        //         $('.portfolio').eq(this.portInd).animate({opacity:0, left:"100px"}, {duration:this.animDuration, easing:"swing"})

        //         if(this.portInd === 0){
        //             this.portInd = 0
        //             clearInterval(portAnimation)

        //             const dutyAnimation = setInterval(() => {
        //                 $('.duty').eq(this.dutyInd).animate({opacity:0, left:"100px"}, {duration:this.animDuration, easing:"swing"})
        //                 if(this.dutyInd === 0){
        //                     this.dutyInd = 0
        //                     clearInterval(dutyAnimation)
        //                 }
        //                 this.dutyInd--
        //             }, this.animDuration);
        //         }

        //         this.portInd--
        //     }, this.animDuration);
        // }
        // experiment end

        async fetchData(dataExp){
            const res = await fetch('../json/experience.json')
            const data = await res.json();

            // remove experience details
            this.expDetailsCont.empty()

            // append new details
            this.expDetailsCont.append(`
                <h3>${data[dataExp]['position']}</h3>
                <span>${data[dataExp]['year']}</span>
                <div class="dutiesWrap">
                    <h5>Key Duties and Responsibilities</h5>
                    <ul></ul>
                </div>
                <div class="portfolioLinksWrap">
                    <h5>Portfolio Links</h5>
                    <ul></ul>
                </div>
            `)

            // append duties to the dutiesWrap ul
            data[dataExp]['duties'].forEach((duty) => {
                $('.dutiesWrap ul').append(`
                    <li class="duty">
                        <i class="fas fa-chevron-right"></i>
                        <p>${duty}</p>
                    </li>
                `)
            })

            // append links to ul element
            data[dataExp]['portfolios'].forEach((portfolio) => {
                $('.portfolioLinksWrap ul').append(`
                    <li class="portfolio">
                        <i class="fas fa-chevron-right"></i>
                        <p>${portfolio}</p>
                    </li>
                `)
            })

            this.enterAnimation();
        }

        clickEvt(){
            this.expBtn.on('click', (e) => {
                // this.exitAnimation()

                if($(e.target).hasClass('activeExp')){
                    // click on the current active button
                    // dont do anything
                    return false; 
                }else{

                    // click to selected experience
                    // loop to remove class of the previous active experience
                    this.expBtn.each((i, elem) => $(elem).removeClass('activeExp'))
                    // add class to selected experience
                    $(e.target).addClass('activeExp')
                    // fade out all the list items of the precious active experience
                    $('.duty').animate({opacity:0, left:"100px"}, {duration:this.animDuration, easing:"swing"})
                    $('.portfolio').animate({opacity:0, left:"100px"}, {duration:this.animDuration, easing:"swing"})

                    // after all of the items fade out, show the items of the selected experience
                    setTimeout(() => {
                        this.fetchData($(e.currentTarget).attr("data-exp"))
                    }, this.animDuration)
                    
                }

            })
        }
    }

    class Portfolio{
        constructor(){
            this.portBtn = $('.portBtn')
            this.portfolioImagesWrap = $('.portfolioImagesWrap') 
            this.portfolioImagesContainer = $('.portfolioImagesContainer')
            this.showMore = `
                <div class="imageWrap showMoreWrap">
                    <button class="showMore"><i class="far fa-eye"></i><span>Show More</span></button>
                </div>
            `
            this.contentNum = window.matchMedia('(min-width:600px)').matches ? 12 : 6
            this.currentIndex = 0
            this.pageNum = 1;
            this.portData = []
            this.animDuration = 800
            // this.currentIndex = 6
        }

        dataLoop(data){

            for(let i = 0; i < data.length; i++){
                if(i === this.contentNum){
                    // if current iteration equal to 12 or 6
                    // append showmore button
                    this.portfolioImagesContainer.append(this.showMore)
                    // set currentIndex to the value of current iteration
                    this.currentIndex = i
                    // add event listener to the showmore btn
                    this.showMoreClickEvt();
                    // breakout of loop
                    break
                }else{
                    // append data
                    this.portfolioImagesContainer.append(`
                        <div class="imageWrap" data-name="${data[i].name}">
                            <img src="${data[i].thumbnail}" alt="${data[i].name}">
                        </div>
                    `)

                    if(i === (data.length - 1)){
                        // if last iteration index is equal to the array length 
                        // set currentIndex to the value of the last iteration
                        this.currentIndex = i
                        // append showmore button
                        this.portfolioImagesContainer.append(this.showMore)
                        // add event listener to the showmore btn
                        this.showMoreClickEvt();
                    }
                }
            }

            $('.imageWrap img').animate({height:"100%", opacity:1}, {duration: this.animDuration, easing: "swing"})

            $('.showMoreWrap').animate({height:"100%"}, {duration:this.animDuration, easing:"swing", complete:
                function(){
                  $(this).children().animate({opacity:1}, {duration:this.animDuration, easing:"swing"}) 
                }
            })

            this.imageWrapClickEvt();
        }

        imageWrapClickEvt(){
            $('.imageWrap').on('click', (e) => {
                // get the details of the selected portfolio item
                const selectedData = this.portData.filter((data) => data.name === $(e.currentTarget).attr("data-name"))
                
                if(selectedData[0] != undefined){
                    // destructure data
                    const { name, link, thumbnail, description, githubLink } = selectedData[0]
                    // create new div and append details
                    this.portfolioImagesWrap.append(`
                        <div class="selectedPortfolioContainer">
                            <div class="selectedPortfolioHeader">
                                <div class="selectedPortfolioDetails">
                                    <h4>${name}</h4>
                                    <a href="${link}"><i class="fas fa-link"></i> ${link}</a>
                                    ${ githubLink !== undefined ? `<a href="${githubLink}" class="githubLink"><i class="fab fa-github"></i> ${githubLink}</a>` : "" }
                                    ${ description !== "" ? `<p>${description}</p>` : "" }
                                </div>
                                <div class="selectedPortfolioBtn">
                                    <i class="fas fa-times selectedPortfolioCloseBtn"></i>
                                </div>
                            </div>
                            <div class="selectedPortfolioBody">
                                <img src="${thumbnail}" alt="${name}" />
                            </div>
                        </div>
                    `)
                    // hide portfolioImagesContainer
                    this.portfolioImagesContainer.animate({opacity:0, marginTop:"60px"}, {duration: this.animDuration, easing: "swing", complete:
                        function(){
                            // set display none of portfolioImagesContainer
                            $(this).css({display:"none"})
                            // show the selectedPortfolioContainer
                            $(this).next().animate({opacity:1, marginTop:"20px"}, {duration: this.animDuration, easing: "swing"})
                        }
                    })

                    // x button click event 
                    $('.selectedPortfolioCloseBtn').on('click', (e) => {
                        // hide selectedPortfolioContainer
                        $('.selectedPortfolioContainer').animate({opacity:0, marginTop:"60px"}, {duration: this.animDuration, easing: "swing", complete:
                            () => {
                                // then remove itself and details
                                $('.selectedPortfolioContainer').remove();
                                // show portfolioImagesContainer
                                this.portfolioImagesContainer.css({display:"grid"}).animate({opacity:1, marginTop:"20px"}, {duration: this.animDuration, easing: "swing"})
                            }
                        })
                    })
                }
            })
        }

        showMoreClickEvt(){
            $('.showMore').on('click', () => {
                // animate img height : hide img
                $('.imageWrap img').animate({height:"0", opacity:0}, {duration: this.animDuration, easing: "swing"})
                // animate showmore btn opacity : hide showmore btn
                $('.showMore').animate({opacity:0}, {duration:500, easing:"swing", complete:
                    function(){
                        // animate showmorewrap height : hide showmorewrap
                        $(this).parent().animate({height:"0"}, {duration:this.animate, easing:"swing"})
                    }       
                })

                setTimeout(() => {
                    // add 1 to pageNum
                    this.pageNum += 1

                    // remove the previously displayed images
                    this.portfolioImagesContainer.empty()

                    for(let i = this.currentIndex; i < this.portData.length; i++){
                        if(i === (this.contentNum * this.pageNum)){
                            // current iteration is equal to the product of contentNum and pagenum
                            // we need to multiply contentNum and pageNum so that we know when to stop the iteration
                            this.portfolioImagesContainer.append(this.showMore)
                            // set currentIndex to the value of current iteration 
                            this.currentIndex = i
                            // add event listener to the showmore btn
                            this.showMoreClickEvt();
                            // breakout of loop
                            break
                        }else{
                            // append data
                            this.portfolioImagesContainer.append(`
                                <div class="imageWrap" data-name="${this.portData[i].name}">
                                    <img src="${this.portData[i].thumbnail}" alt="${this.portData[i].name}">
                                </div>
                            `)
                        }
                    }
                    // animate image height : show img
                    $('.imageWrap img').animate({height:"100%", opacity:1}, {duration: this.animDuration, easing: "swing"})
                    // animate showmorewrap height : show showmorewrap
                    $('.showMoreWrap').animate({height:"100%"}, {duration:this.animDuration, easing:"swing", complete:
                        function(){
                            // animate showmore btn opacity after shomorewrap animate : show showmore btn
                            $(this).children().animate({opacity:1}, {duration:this.animDuration, easing:"swing"}) 
                        }
                    })

                    this.imageWrapClickEvt();

                }, this.animDuration)
            })
        }

        async fetchData(val){
            const res = await fetch('../json/portfolio.json')
            const data =  await res.json()

            // remove the previously displayed images
            this.portfolioImagesContainer.empty()
            // set portData value to the data that we fetch
            this.portData = data[val];
            // call dataloop method to append all the data to portfolioImagesContainer
            this.dataLoop(data[val])
        }

        resizeEvt(){
            $(window).on('resize', (e) => {
                if($(e.target).outerWidth() >= 600){
                    // desktop and tablet size
                    // reset value
                    this.contentNum = 12
                    this.pageNum = 1;
                    
                    // remove the previously displayed images
                    this.portfolioImagesContainer.empty()
                    // call dataloop method to append all the data from this.portData property to portfolioImagesContainer
                    this.dataLoop(this.portData)

                }else{
                    // mobile size
                    // reset value
                    this.contentNum = 6
                    this.pageNum = 1;

                    // remove the previously displayed images
                    this.portfolioImagesContainer.empty()
                    // call dataloop method to append all the data from this.portData property to portfolioImagesContainer
                    this.dataLoop(this.portData)

                }
                
            })
        }

        catClickEvt(){
            this.portBtn.on('click', (e) => {

                if($(e.target).hasClass('activePort')){
                    // click on the current active button
                    // dont do anything
                    return false; 
                }else{
                    // click to selected portfolio
                    // loop to remove class of the previous active portfolio
                    this.portBtn.each((i, elem) => $(elem).removeClass('activePort'))
                    // add class to selected portfolio
                    $(e.target).addClass('activePort')
                    // reset values
                    this.pageNum = 1
                    this.currentIndex = 0
                    // fetch all the data of the selected portfolio
                    this.fetchData($(e.target).text())   
                }
            })
        }
    }

    class Scrolling{
        constructor(btn){
            this.btn = btn
            this.aboutCharImg = 0
            this.aboutCharOpacity = 0
        }

        windowScrollEvnt(){
            $(window).on('scroll', (e) => {
                const curScrollVal = e.currentTarget.pageYOffset

                // aboutWrap animation start
                if(curScrollVal >= ($('#about').prev().height() / 2) && ($('#about').offset().top + ($('#about').height() / 2)) > curScrollVal){

                    $('#about').find('.characterWrap img').css({left:"50%", opacity: 1})
                    $('#about').find('.aboutInfoWrap').css({right:"0%", opacity: 1})
                    $('#about').find('.characterWrap svg').css({transform:"translateX(-50%) scale(1)", opacity:1})
                
                }else if(curScrollVal >= $('#portfolio').offset().top || curScrollVal === 0){

                    $('#about').find('.characterWrap img').css({left:"0%", opacity: 0})
                    $('#about').find('.aboutInfoWrap').css({right:"-50%", opacity: 0})
                    $('#about').find('.characterWrap svg').css({transform:"translateX(-50%) scale(0)", opacity:0})
                    
                }
                // aboutWrap animation end

                // portfolioWrap animation start
                if(curScrollVal >= ($('#portfolio').offset().top - ($('#about').height() / 2)) && ($('#portfolio').offset().top + ($('#portfolio').height() / 2)) > curScrollVal){
                    $('#portfolio').find('.portfolioContainer').css({left:"0%", opacity:1})

                }else if(curScrollVal >= $('#experience').offset().top || curScrollVal <= $('#about').offset().top){
                    $('#portfolio').find('.portfolioContainer').css({left:"-50%", opacity:0})
                }
                // portfolioWrap animation end

                // experience animation start
                if(curScrollVal >= $('#experience').offset().top - ($('#portfolio').height() / 2) && ($('#experience').offset().top + ($('#experience').height() / 2)) > curScrollVal){
                    $('#experience').find('.experienceContainer').css({right:"0%", opacity:1})
                }else if(curScrollVal >= $('#contact').offset().top || curScrollVal <= $('#portfolio').offset().top){
                    $('#experience').find('.experienceContainer').css({right:"-50%", opacity:0})
                }
                // experience animation end

                // contact animation start
                if(curScrollVal >= $('#experience').offset().top){
                    $('#contact').find('.contactContainer').css({top:"0px", opacity:1})
                }else if(curScrollVal <= $('#experience').offset().top){
                    $('#contact').find('.contactContainer').css({top:"200px", opacity:0})
                }
                // contact animation end
            })
        }
    }

    const navigation = new Navigation
    const portfolio = new Portfolio
    const experience = new Experience

    const scrolling = new Scrolling(navigation.menuBurgerBtn)

    navigation.toggleMenu()
    navigation.resizeEvent()
    navigation.clickEvt()

    portfolio.fetchData("Graphics Design");
    portfolio.resizeEvt();
    portfolio.catClickEvt();

    experience.fetchData($(experience.expBtn[0]).attr("data-exp"))
    experience.clickEvt()

    scrolling.windowScrollEvnt()
})