"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Log extends Model {
		static associate(models) {
			// define association here
		}
	}

	Log.init(
		{
			method: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			pathname: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			params: {
				type: DataTypes.JSON,
				allowNull: false,
			},
			query: {
				type: DataTypes.JSON,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				field: "created_at",
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				field: "updated_at",
			},
			deletedAt: {
				type: DataTypes.DATE,
				field: "deleted_at",
			},
		},
		{
			sequelize,
			modelName: "Log",
			underscored: true,
			tableName: "logs",
			timestamps: true,
			paranoid: true,
		}
	);

	return Log;
};
