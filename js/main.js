$(() => {
    class Experience{
        constructor(){
            this.expBtn = $('.expBtn')
            this.expDetailsCont = $('.experienceDetailsContainer')
        }

        async fetchData(dataExp){
            const res = await fetch('../json/experience.json')
            const data = await res.json();

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

    const experience = new Experience

    experience.fetchData($(experience.expBtn[0]).attr("data-exp"))
    experience.clickEvt()
})