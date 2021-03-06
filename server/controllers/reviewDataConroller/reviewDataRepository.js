const { ReviewData } = require('../../db/models/Review');

class ReviewDataRepository {
    constructor(workspaceId) {
        this.workspaceId = workspaceId != null ? workspaceId : null;
    }

    getById() {
        if (this.workspaceId != null) {
            return ReviewData.findOne({ workspaceId: this.workspaceId }).select(
                {
                    _id: 0,
                    avg: 1,
                    reviewCount: 1,
                },
            );
        }
    }

    async create() {
        const latestRecord = await ReviewData.find()
            .limit(1)
            .sort({ $natural: -1 });

        const workspaceId = latestRecord[0].workspaceId + 1;

        return ReviewData.create({
            workspaceId,
            workspaceSlug: `workspace-${workspaceId}`,
        });
    }
}

module.exports = ReviewDataRepository;
