'use strict'

const Survey = use('App/Models/Survey')

const resolvers = {
    Query: {
        async readSurveys() {
            const surveys = await Survey.all()
            return await surveys.toJSON()
        },
        
        async readSurvey(_, { id }) {
            const survey = await Survey.find(id)
            return await survey.toJSON()
        },
    },

    Mutation: {  
        async createSurvey(_, { name, description, questions }) {
            return await Survey.create({ name, description, questions })
        },

        async deleteSurvey(_, { id }) {
            const survey = await Survey.find(id)
            await survey.delete()
            
            return await survey.toJSON()
        },

        async updateSurvey(_, { id, name, description, questions }) {
            const survey = await Survey.find(id)

            survey.name = name
            survey.description = description
            survey.questions = questions

            await survey.save()

            return await survey.toJSON()
        },
    },
}

module.exports = resolvers