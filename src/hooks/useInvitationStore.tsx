import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../store/store';
import { onCheckingInvitations, onLoadInvitations, onResponseInvitation } from '../store/invitations/invitationSlice';
import { schedulerApi } from '../api/schedulerApi';
import { Invitation, InvitationStatus } from '../interfaces/storeInterfaces';

export const useInvitationStore = () => {

    const dispatch = useAppDispatch();
    const {invitations, isLoading} = useSelector((state: RootState) => state.invitation);

    const startLoadInvitations = async() => {
        try {
            dispatch(onCheckingInvitations());

            const {data} = await schedulerApi.get<Invitation[]>('/events/participants/invitations/me');

            dispatch(onLoadInvitations(data));

        } catch (error) {
            console.log(error);
        }
    };

    const startResponseInvitation = async(invitation: Invitation, status: InvitationStatus) => {
        try {

            const {event} = invitation;

            dispatch(onCheckingInvitations());
            await schedulerApi.post(`/events/${event?.id}/participants/replies`, {
                status,
            });

            invitation.status = status;

            dispatch(onResponseInvitation(invitation));

        } catch (error) {
            console.log(error);
        }
    };

    return {
        // datos del InvitationStore
        invitations,
        isLoading,

        // thunks del InvitationsStore
        startLoadInvitations,
        startResponseInvitation,
    };
};
