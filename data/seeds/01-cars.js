exports.seed = function(knex) {
    return knex('cars').truncate()
        .then(function() {
            return knex('cars').insert([
                { make: 'ford', vin: '55228899663311447', model: 'f150', mileage: 157205, title: 'clean', transmission: 'rebuilt' },
                { make: 'chevy', vin: '98765432198765432', model: 'blazer', mileage: 524, title: 'salvaged'},
                { make: 'jeep', vin: '12345678912345678', model: 'compass', mileage: 10532,transmission: 'new' }
            ])
        })
}
