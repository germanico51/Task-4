
var app = new Vue({  
  el: '#app',  
  data: { 
    miembrosVue:  [],   
    miembrosFiltrados:[]
  },
  methods:{
     getCheckBoxes(nombre) {
      return Array.from(document.querySelectorAll(`input[name=\"${nombre}\"]:checked`)).map(check => check.value);
  },
  
   getStateFilterValue(nombre) {
      return document.querySelector(`select[name=\"${nombre}\"]`).value;
  },
  
   filterMembers() {
      let checkValues, stateFilterValue;
  
      checkValues = this.getCheckBoxes('party-filter');
      stateFilterValue = this.getStateFilterValue('state-filter');

      this.miembrosFiltrados=this.miembrosVue.filter(members => checkValues.includes(members.party))
      .filter(members => (!stateFilterValue || members.state === stateFilterValue));
  
  },
   cargar(miembros){
    this.miembrosVue = miembros;
     this.filterMembers();
   }

  }

  
}); 

