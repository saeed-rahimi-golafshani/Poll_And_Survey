const createHttpError = require("http-errors");
const { PollModel } = require("../../../Model/Poll.Model");
const { convertGregorianToPersionToday, checkExistOfModelByTitleWithoutFile, checkExistOfModelById, copyObject, deleteInvalidPropertyObject } = require("../../../Utills/Public_Function");
const { createPollSchema } = require("../../Validation/Admin/Poll.Schema");
const Controller = require("../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const pollBlockList = {
  HOST_ID: "host_Id",
  SLUG: "slug",
  CREATEDAT: "createdAt",
  UPDATEDAT: "updatedAt"
};
Object.freeze(pollBlockList);

class PollController extends Controller{
  async createPoll(req, res, next){
    try {
      const requestBody = await createPollSchema.validateAsync(req.body);
      const { title, en_title, meta_title, summery, type, published, publishedAt, startAt, endAt, content } = requestBody;
      await checkExistOfModelByTitleWithoutFile(title, PollModel);
      const hostUser = req.user._id;
      const slugPoll = (en_title.split(" ").toString()).replace(/,/g, "_");
      const craeteDate = convertGregorianToPersionToday();
      const updateDate = convertGregorianToPersionToday();
      const createResault = await PollModel.create({
        host_Id: hostUser,
        title,
        en_title,
        meta_title,
        slug: slugPoll,
        summery,
        type,
        published,
        createdAt: craeteDate,
        updatedAt: updateDate,
        publishedAt,
        startAt,
        endAt,
        content
      });
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "نظرسنجی با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfPoll(req, res, next){
    try {
      const polls = await PollModel.aggregate([
        {
          $match: {}
        },
        {
          $lookup: {
            from: "users",
            localField: "host_Id",
            foreignField: "_id",
            as: "host_Id"
          }
        },
        {
          $unwind: "$host_Id"
        },
        {
          $project: {
            "__v": 0,
            "host_Id.username": 0,
            "host_Id.mobile": 0,
            "host_Id.email": 0,
            "host_Id.active": 0,
            "host_Id.createdAt": 0,
            "host_Id.updatedAt": 0,
            "host_Id.__v": 0,
          }
        }
      ]);
      if(!polls) throw new createHttpError.NotFound("نظرسنجی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          polls
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfPollById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, PollModel);
      const poll = await PollModel.aggregate([
        {
          $match: {_id: checkId._id}
        },
        {
          $lookup: {
            from: "users",
            localField: "host_Id",
            foreignField: "_id",
            as: "host_Id"
          }
        },
        {
          $unwind: "$host_Id"
        },
        {
          $project: {
            "__v": 0,
            "host_Id.username": 0,
            "host_Id.mobile": 0,
            "host_Id.email": 0,
            "host_Id.active": 0,
            "host_Id.createdAt": 0,
            "host_Id.updatedAt": 0,
            "host_Id.__v": 0,
          }
        }
      ]);
      if(!poll) throw new createHttpError.NotFound("نظرسنجی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          poll
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async updatePoll(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, PollModel);
      const requestData = copyObject(req.body);
      let blackFeildList = Object.values(pollBlockList);
      deleteInvalidPropertyObject(requestData, blackFeildList);
      const updateResault = await PollModel.updateOne({_id: checkId._id}, {$set: requestData});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "نظرسنجی با موفقیت به روز رسانی شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  PollController: new PollController()
}