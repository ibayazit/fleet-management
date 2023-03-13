const responder = require('../../utils/responder')
const chargeSessionService = require('../services/charge-session.service')
const organizationService = require('../services/organization.service')

const findLatestUnfinishedSession = responder(async (req, res) => {
    const status = await chargeSessionService.findByUserIdUnfinished(req.user._id)

    return {
        data: status
    }
})

const doneSessions = responder(async (req, res) => {
    const status = await chargeSessionService.findByUserIdFinished(req.user._id)

    return {
        data: status
    }
})

const createCharingSession = responder(async (req, res) => {
    const status = await chargeSessionService.findByUserIdUnfinished(req.user._id)
    const organization = await organizationService.findById(req.user.organization_id)

    if(organization.battery <= 0){
        throw new Error('Organization\' battery is empty');
    }

    let currentStatus = null;
    let isNewSession = true;

    if(!status){
        currentStatus = await chargeSessionService.newChargeSession({
            organization_id: req.user.organization_id,
            user_id: req.user._id,
            battery_level: req.body.battery_level,
            amount: 0.5,
            status: req.body.status
        });
    }
    else{
        isNewSession = false;
        currentStatus = await chargeSessionService.pushNewStatusToSession(status, {
            battery_level: req.body.battery_level,
            status: req.body.status,
        });
    }

    return {
        data: currentStatus,
        message: isNewSession ? 'New charge session started' : 'Current charge status updated'
    }
})

module.exports = {
    findLatestUnfinishedSession,
    doneSessions,
    createCharingSession
}