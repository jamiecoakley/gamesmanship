module.exports=(sequelize, DataTypes) => {
    return sequelize.define('gamer', {
        gamername: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,           
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}