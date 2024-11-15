import { Request, Response } from 'express';
import WithdrawalRequest from '../models/withdrawalRequest';

export const getAllWithdrawalRequests = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    // Fetch withdrawal requests with pagination
    const withdrawalRequests = await WithdrawalRequest.find(query)
      .populate('user', 'username email')
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .exec();

    // Get total count for pagination
    const totalCount = await WithdrawalRequest.countDocuments(query);

    res.json({
      withdrawalRequests,
      totalPages: Math.ceil(totalCount / +limit),
      currentPage: +page,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching withdrawal requests:', error);
    res
      .status(500)
      .json({ message: 'Error fetching withdrawal requests', error });
  }
};

// Approve withdrawal request
export const approveWithdrawalRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const withdrawalRequest = await WithdrawalRequest.findById(id).populate(
      'user',
      'username email',
    );
    if (!withdrawalRequest) {
      res.status(404).json({ message: 'Withdrawal request not found' });
      return;
    }

    if (withdrawalRequest.status !== 'pending') {
      res
        .status(400)
        .json({ message: 'Only pending requests can be approved' });
      return;
    }

    withdrawalRequest.status = 'approved';
    await withdrawalRequest.save();

    res.json({
      message: 'Withdrawal request approved successfully',
      withdrawalRequest,
    });
  } catch (error) {
    console.error('Error approving withdrawal request:', error);
    res
      .status(500)
      .json({ message: 'Error approving withdrawal request', error });
  }
};

// Decline withdrawal request
export const declineWithdrawalRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const withdrawalRequest = await WithdrawalRequest.findById(id).populate(
      'user',
      'username email',
    );
    if (!withdrawalRequest) {
      res.status(404).json({ message: 'Withdrawal request not found' });
      return;
    }

    if (withdrawalRequest.status !== 'pending') {
      res
        .status(400)
        .json({ message: 'Only pending requests can be declined' });
      return;
    }

    withdrawalRequest.status = 'rejected';
    await withdrawalRequest.save();

    res.json({
      message: 'Withdrawal request declined successfully',
      withdrawalRequest,
    });
  } catch (error) {
    console.error('Error declining withdrawal request:', error);
    res
      .status(500)
      .json({ message: 'Error declining withdrawal request', error });
  }
};
