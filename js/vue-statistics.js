var app = new Vue({
    el: '#app',
    data: {
        miembrosVue: [],
        
        statistics: {
            numbers_of_republicans: 0,
            numbers_of_democrats: 0,
            numbers_of_independents: 0,
            numbers_of_total: 0,
        
            average_votes_party_republicans: 0,
            average_votes_party_democrats: 0,
            average_votes_party_independents: 0,
            average_votes_party_total: 0,
        
            least_loyal: [],
            most_loyal: [],
            least_engaged: [],
            most_engaged: [],
        }
    },
    methods:{
        

       getMembersByParty(PartyMembers) {
            var members = this.miembrosVue.filter(member => member.party == PartyMembers)
            return members;
        },
        
         getAverage(PartyArraymMembers) {
            return (PartyArraymMembers.reduce((accumulator, member) => accumulator + member.votes_with_party_pct, 0) / PartyArraymMembers.length).toFixed(2);
        },
        

        filterByPercent(data, percent, type, key) {
            let dataOrd = data.sort((a, b) => (a[key] - b[key])); //ordena el array por votos
            let posPercent = Math.ceil((percent * dataOrd.length) / 100) - 1; // entero superior del 10%
            let valuePositionPersent = dataOrd[posPercent][key]; // valor de la posicion del porcentaje
            let dataFilterByPercent = dataOrd.filter((member) => (type == ">" ? member[key] <= valuePositionPersent : member[key] >= valuePositionPersent)); //filtra segun el valor de la pos en la cola del array
                                                                  
            return dataFilterByPercent;                                                         
        },
        
        llenarEstadisticas(){
        this.statistics.numbers_of_republicans = this.getMembersByParty("R").length;
        this.statistics.numbers_of_democrats = this.getMembersByParty("D").length;
        this.statistics.numbers_of_independents = this.getMembersByParty("I").length;
        this.statistics.numbers_of_total = this.miembrosVue.length;
        
        this.statistics.average_votes_party_democrats = this.getAverage(this.getMembersByParty("R"));
        this.statistics.average_votes_party_republicans = this.getAverage(this.getMembersByParty("D"));
        this.statistics.average_votes_party_independents =this.getAverage(this.getMembersByParty("I"));
        this.statistics.average_votes_party_total = this.getAverage(this.miembrosVue)
        
        this.statistics.least_loyal =this.filterByPercent(this.miembrosVue, 10, ">", "votes_with_party_pct");
        
        this.statistics.most_loyal =this.filterByPercent(this.miembrosVue, 90, "", "votes_with_party_pct").reverse()
        
        this.statistics.most_engaged = this.filterByPercent(this.miembrosVue, 10, ">", "missed_votes_pct")
        this.statistics.least_engaged = this.filterByPercent(this.miembrosVue, 90, "", "missed_votes_pct").reverse()
    },
     getMemberVotesWithParty(member) {
            return Math.round(member.total_votes * member.votes_with_party_pct / 100);
        },
        cargar(miembros) {
            this.miembrosVue = miembros;
            this.llenarEstadisticas();
        },
        esCero(num)
        {
           return (isNaN(num)? 0 : obj);
        }
}
});