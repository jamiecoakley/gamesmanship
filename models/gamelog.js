module.exports = function(sequelize, DataTypes) {
    return sequelize.define('game', {
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,          
        },

        hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        review: {
            type: DataTypes.STRING(8000),
            allowNull: false,
            
        },

        media: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
}