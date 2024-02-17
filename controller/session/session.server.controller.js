import dotenv from "dotenv";
import { Session } from "../../models/session.server.model.js";
import { logger } from "../../utils/logger.util.js";
import os from "os";

dotenv.config();

export const createSession = async (req, res) => {
  try {
    const { code, sessionName } = req.body;
    console.log(`some body ${code}, ${sessionName}`);
    const currentSess = await Session.findOne({ sessCode: code });

    if (currentSess) {
      return res.status(201).json({
        sessCodeCreated: true,
        sessionExists: true,
      });
    }

    const newSession = new Session({
      sessCode: code,
      hostname: os.hostname(),
      sessionName: sessionName
    });

    newSession.save();

    return res.status(201).json({
      sessCodeCreated: true,
      sessionExists: false,
    });
  } catch (err) {
    logger.error(`${err}`, { meta: { method: "setSessCode" } });
    return res.status(500).json({
      sessCodeCreated: false,
    });
  }
};
