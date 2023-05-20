import cutText from '../functions/cutText';
import { ChatI } from '../interfaces/interfaces';
import avatar from '../public/no-profile-picture-icon.png';

interface UserInfoProps{
    chat:ChatI;
    renderlastMessage?: boolean;
}

const UserInfo = ({chat, renderlastMessage = true}: UserInfoProps) => {
    return(
        <div style={{display:'flex', alignItems:'center'}}>
            <div style={{width:'3rem'}}>
                <img style={{borderRadius: '50%'}} src={avatar} width={'100%'} height={'auto'} alt="аватар"></img>
            </div>

        <div 
        style={{color:'#fff', textAlign:'left', paddingLeft:'1rem', height:'6rem'}}
        key={chat.phoneNumber}>
            <p>
                {chat.phoneNumber}
            </p>  
            {renderlastMessage && chat.messages.length > 0 ? <p> {cutText(chat.messages[chat.messages.length - 1].text, 40)} </p> : null}            
        </div>
    </div>
    )
}

export default UserInfo;