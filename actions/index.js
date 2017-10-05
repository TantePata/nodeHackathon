module.exports = (api) => {
    api.actions = {
        answers:    require('./answers/crud')(api),
        auth:       require('./auth')(api),
        classes:    require('./classes/crud')(api),
        exercises:  require('./exercises/crud')(api),
        lessons:    require('./lessons/crud')(api),
        questions:  require('./questions/crud')(api),
        subjects:   require('./subjects/crud')(api),
        users:      require('./users/crud')(api),
        videos:     require('./videos/crud')(api),
    };
};