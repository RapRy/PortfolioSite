$(() => {
    class Experience{
        constructor(){
            this.expBtn = $('.expBtn')
            this.expDetailsCont = $('.experienceDetailsContainer')
        }

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
                <div class="imageWrap showMoreWrap">
                    <button class="showMore"><i class="far fa-eye"></i><span>Show More</span></button>
                </div>
            `
            this.contentNum = window.matchMedia('(min-width:600px)').matches ? 12 : 6
            this.currentIndex = 0
            this.pageNum = 1;
            this.portData = []
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
        }

        showMoreClickEvt(){
            $('.showMore').on('click', () => {
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
                    this.pageNum = 1
                    // remove the previously displayed images
                    this.portfolioImagesContainer.empty()
                    // call dataloop method to append all the data from this.portData property to portfolioImagesContainer
                    this.dataLoop(this.portData)
                }else{
                    // mobile size
                    // reset value
                    this.contentNum = 6
                    this.pageNum = 1
                    // remove the previously displayed images
                    this.portfolioImagesContainer.empty()
                    // call dataloop method to append all the data from this.portData property to portfolioImagesContainer
                    this.dataLoop(this.portData)
                }
                

            })
        }

        catClickEvt(){
            this.portBtn.on('click', (e) => {
                
                this.pageNum = 1
                this.currentIndex = 0
                this.fetchData($(e.target).text())
            })
        }
    }

    const portfolio = new Portfolio
    const experience = new Experience

    portfolio.fetchData("Graphics Design");
    portfolio.resizeEvt();
    portfolio.catClickEvt();

    experience.fetchData($(experience.expBtn[0]).attr("data-exp"))
    experience.clickEvt()
})