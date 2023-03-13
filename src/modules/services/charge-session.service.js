const mongoose = require('mongoose')
const chargeStatusModel = require('../../database/models/charge-session.model')

const findByUserIdUnfinished = async (userId) => {
    const session = await chargeStatusModel.findOne({
        user_id: new mongoose.Types.ObjectId(userId),
        status: {
            $nin: [
                'fail', 'done'
            ]
        }
    }).sort({ createdAt: -1 })

    return session
}

const findByUserIdFinished = async (userId) => {
    const session = await chargeStatusModel.find({
        user_id: new mongoose.Types.ObjectId(userId),
        status: {
            $in: [
                'fail', 'done'
            ]
        }
    }).sort({ createdAt: -1 })

    return session
}

const newChargeSession = async (data) => {
    if (!['waiting', 'fail'].includes(data.status))
        throw new Error('Status must be "waiting" or "fail"');

    const session = await chargeStatusModel.create({
        organization_id: data.organization_id,
        user_id: data.user_id,
        initial_battery_level: data.battery_level,
        last_battery_level: data.battery_level,
        amount: data.amount,
        status: data.status,
        statuses: [
            {
                name: data.status
            }
        ]
    });

    return session;
}

const pushNewStatusToSession = async (currentStatus, data) => {
    const isStatusValid = (status) => {
        const statuses = [
            'waiting',
            'started',
            'charging',
            'stopping',
            'stopped',
            'done'
        ];

        if (!statuses.includes(status) || status === 'done' || status === 'fail')
            return 'fail';

        return statuses[statuses.indexOf(status) + 1]
    }

    let newStatusName = isStatusValid(currentStatus.status)

    if (newStatusName !== data.status && data.status !== 'fail')
        throw new Error(`Unexpected status. Status must be "${newStatusName}" or "fail"`);
    else if(data.status === 'fail')
        newStatusName = 'fail'

    currentStatus.last_battery_level = data.battery_level
    currentStatus.status = newStatusName
    currentStatus.statuses.push({
        name: newStatusName
    })

    const status = await currentStatus.save()

    return status
}

module.exports = {
    findByUserIdFinished,
    findByUserIdUnfinished,
    newChargeSession,
    pushNewStatusToSession
}