$(() => {
    class Experience{
        constructor(){
            this.expBtn = $('.expBtn')
            this.expDetailsCont = $('.experienceDetailsContainer')
        }

        async fetchData(dataExp){
            const res = await fetch('../json/experience.json')
            const data = await res.json();

            this.expDetailsCont.empty()

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

            data[dataExp]['duties'].forEach((duty) => {
                $('.dutiesWrap ul').append(`
                    <li class="duty">
                        <i class="fas fa-chevron-right"></i>
                        <p>${duty}</p>
                    </li>
                `)
            })

            data[dataExp]['portfolios'].forEach((portfolio) => {
                $('.portfolioLinksWrap ul').append(`
                    <li class="portfolio">
                        <i class="fas fa-chevron-right"></i>
                        <p>${portfolio}</p>
                    </li>
                `)
            })
        }

        clickEvt(){
            this.expBtn.on('click', (e) => {
                this.fetchData($(e.currentTarget).attr("data-exp"))
            })
        }
    }

    class Portfolio{
        constructor(){
            this.portBtn = $('.portBtn')
            this.portfolioImagesContainer = $('.portfolioImagesContainer')
            this.showMore = `
                <div class="imageWrap">
                    <button class="showMore"><i class="far fa-eye"></i><span>Show More</span></button>
                </div>
            `
            this.currentIndex = window.matchMedia('(min-width:600px)').matches ? 11 : 6
            this.portData = []
            // this.currentIndex = 6
        }

        dataLoop(data){
            data.forEach((dat, i) => {
                if(i === this.currentIndex){
                    this.portfolioImagesContainer.append(this.showMore)
                    return false;
                }else{
                    this.portfolioImagesContainer.append(`
                        <div class="imageWrap" data-name="${dat.name}">
                            <img src="${dat.thumbnail}" alt="${dat.name}">
                        </div>
                    `)
                }
            })
        }

        async fetchData(val){
            const res = await fetch('../json/portfolio.json')
            const data =  await res.json()
        
            this.portfolioImagesContainer.empty()

            this.portData = data[val];

            this.dataLoop(data[val])
        }

        resizeEvt(){
            $(window).on('resize', (e) => {
                if($(e.target).outerWidth() >= 600){
                    this.currentIndex = 11
                    this.portfolioImagesContainer.empty()
                    this.dataLoop(this.portData)
                }else{
                    this.currentIndex = 6
                    this.portfolioImagesContainer.empty()
                    this.dataLoop(this.portData)
                }
                

            })
        }

        clickEvt(){
            this.portBtn.on('click', (e) => {
                this.fetchData($(e.target).text())
            })
        }
    }

    const portfolio = new Portfolio
    const experience = new Experience

    portfolio.fetchData("Graphics Design");
    portfolio.resizeEvt();
    portfolio.clickEvt();

    experience.fetchData($(experience.expBtn[0]).attr("data-exp"))
    experience.clickEvt()
})