//PrfBaseProfile.js
import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';

export default class PrfBaseProfile extends Component {
  constructor(props) {
    super(props);

    //default avatar (anonymous)
    this.noAvatarBase64Img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgMFAwMDBQUEAwMEBQYFBQUFBQYIBgcHBwcGCAgJCgoKCQgMDAwMDAwODg4ODhAQEBAQEBAQEBD/2wBDAQMEBAYGBgwICAwSDgwOEhQQEBAQFBEQEBAQEBEREBAQEBAQERAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAEsASwDAREAAhEBAxEB/8QAHAABAQEAAgMBAAAAAAAAAAAAAAECBwgEBQYD/8QAQxAAAQMCBAQDBgMGBQMDBQAAAQACESExAwQSQQUGUWEicYEHMkKRobETwfAII1LR4fEUFWJygiSSohZTYxglM7LC/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAEFBgQDAv/EADERAQACAQQBAwMCBQMFAAAAAAABAgMEESExBRJRYSJBcRMyQoGRofAUFTMjYrHB0f/aAAwDAQACEQMRAD8A5zAAgTqPu/nNVq2BKAiGiTOkA7IMslviN6m8TA3QaEtJJkt+L+fyQRocHEmxMaRa/ZBJ1HxW36mAgMpRoBnrNR8qILR5L9qjr9BRAiDNWgbwJ72QAXEaiNRnrA2t8kB2mAayN/JBAfUWO5r+oQUwPC7c77T1hAa1thUttanyCBFQbUs4W3lAgyQDe43tWhQDq1CDAEmd/p3QPAWF0CLiZ9b3QA0OdpcQegoPsguoaoAvS/zQQSSX0maGJHzQUBwq2sCm0yZtZBC5pGsxN21FUAGCNdx8IsgoJcT08r7goMlxLhJgChaK03lBajS6JPqaIK3SaOtJIB+SCaS03qawOv6KC3Amsihk/nugh1bSKUHQz1J6oLPjIAmLilJNdkEfFCDE37/zQUQDSXaqbET3QC2aG5uesUP0QHudRsXvSUEkEBokA37A/SqC+H3Y397vP3QQEgER2AiJk9Ce6AADaTIgE9TvsUAG+kAltnGyCC3hImaGN/6oLT3jcXIBkDugpgNEmbNcCd/qgVppMdYipsgnikuIrvSI9eyAwC06gZN5QUtdIIEnpPyJQQEO96p3NtvRBYgwB0Foogky8iPCLdINr0QJJLQBXaLA19UH1fKXsw5y5uYzH4bkjhZR0Rnc0Tg4UG5aYJcP9oK58mopTueXbh0mTJ1HHu5U4D+zhwbLacbmHiWNnMSmrCy4GDhz0Jdqcf8AxVffXW/hhbY/GVj907vtuHeyr2fcMDfwOCYGKW2dmQcwZ6/vi4LktqMk/d300eGvVY/8vfZbgfBcmA3J8Py+ABYYWDhsA/7QF5Te09y6Ix1jqIeYGMaIa0AdAF8PR+WNkclmBGYy+Hig3D2Nd9wpiZh8zWJ7h6jPch8l8RBGc4Jk3k3e3AYx/wD3MAd9V6xmvHUy8bafFbusf0fJcY9gHIvEAX8OGPwzF+E4OKcRk3q3F1EjsCF0V1mSO+XHfx2K3W8OOOZvYFzfwhr8xwXEw+L4LQSBh/u8xT/Q8kH0cT2Xdj1lLd8KvL47JXmvMONszlsfI4+Jl87hPwMfBMYmFiNcx7D0c10EFd0TE8wqpiYnaX5BzhWImAJkqUDm1BNItWOghBGljXSBAk1NAKIKG/CR30iAfughE6hEbhwtvdAIvG9In5CEFkXAik0jboghMuDQ4npG6AaGZrUiKelUFFHgik7xM+oQC0urHY+Y3lAJIAkxF7Csd0EMkiRUXpM3H1QJF/hj3opfz69kDU4EF1LwBUg/zQKCgqSNxFR/VAIoQPFvuUASKgTqvEGT37II4k0MAn4gKmP6oloEQT1jvMeqIQFxENdNfFcx9JQGihBmhvuN7lBY1AgiZoXA0lBJJAFjXV2p3QAWvDY8MVjp3QKQalsTTaD2QeXwjhHEON5/A4VwjBOazWOYw8Fgqd5JmgFyTTqvm1orG8vulLXnaI3l2F9n/sO4Ly63C4nzI1nE+JCHDCInLYJiwaffI6mnQbqlzau1uK8Q0um0Fac35n+zlAAAAAQBQALgWyoCAgICAgICD57m3kTlvnTK/g8ZywOM0Rg5zDhmPh/7X7jsZHZe2PNak8ObNp6ZY+qHW72gezPj3IObDsf/AKrhuKSzLcQw2w2SaNeB7ru2+x6XmHPXJHyzGp0tsU88x7vkbiBWZIMdaLpcKNGkGsHcb02QW9YoSBJ7+aAG6f3h29RHQIM+IamlvhiBtY90GpcDBi1t6HtJQDpA6edpv/RBGySJIdBqd4KCuZDhsSbj0QGt0kahIFBN9uqCAyS5wrWBNgKfdAcI1EiYNp2uUF7Uvp2/tZBCGh/jMTU1I7fmg0XBpJdB/X8kEBdURNR4vrugldW4rEmKmyAHNLQLAzETAhAq1up9nX2hA1ONDekCK+e3RBauGkiJJBB8pt6oMjS6XxBM7gjugOIe41FPy80A1ZBoAYtePOqJeXkchmuK57AyGQwjj4+Ze3DwcJolznvMAA+voomYiN5TWs2naO5dpfZr7OeH8hcKAIbj8UzIBzubvev4bCahgPzNT2z+fPOSfhrtLpYw1+fu+yXK7hAQEBAQEBAQEBB43EeHZHi+RxuG8SwW5jLZhpZjYLxIcD+fQ7L6raYneHzasWjaenVr2n+zzN8h8YDcInG4ZmtTsjmHASBMuw3mg1Nm+4+l/gzRkr8sjq9NOG3xPT42CSHCaUMf1XU4VhxEzQ1oO3USgy6ALWmSNogjqgrmkCo6CLt+SCA0AjUQL2jbogAbHa9Nj/eqC1MtAr1FI+SCVqAQ0GrZ3n7oLeazak232QZgEQ2hbtM1CDYsC25pq/QQZimiDp92fVAMhxBqLuNJiyCDSADHYgTQHyQbcL1mBBsYQZjSW2makb+dOyCuBMO2Nq+vVA0kQYkbTcdKIJqaQJ3NBX63qggEscSY3+t0SpaCzVERaKX/AJIhDQgkUJqD2FO6DUFrSHUBBkoOeP2f+R2YGVfzrxDDnFxteDwwO+HDBjExPNx8I7A9VUa3Lz6I/m0PjdPtH6k/yc0KrXogICAgICAgICAgICD0fOfKuS5y5ezXA84ADijVlsaK4WM2rHjyN+okL1xZJpbeHPnwxlpNZdQeI5LN8NzuPw7O4f4WZyr34OPhnbEYYIpMiQVpYmJjeGLtWazMT3D8YkF336C8iVL5T3paN9hG/VAu4keZBpW3mg0TJINaGR1H0QSCRoFCZMbeVKIIKEub6wbkxaiCPNSWmHWM09UFgmHXpMipj1QUNgERX590CfeBFfKlZ3QNR0aqxaZ9EEqQNMeImKm5rSEC52uSAaGDfqgNGkCDBsd67oI6su0263pS4QaEujSABMmk1hBkg21S4UBn5boNESZG1SbkdIugw42n4awJpHYolWlwkG7hJ3+vkiG4IcNRJttSaIPK4JwrMcc4tlOE5Ufvc7jMwMM3AOI4CTcQN182t6YmfZ6UpNrRWPu7l8M4fleE8Oy3C8k3RgZTDZg4LejWNDRPeizFrTM7y29KxWsRHUPKXy+xAQEBAQEBAQEBAQEBB11/aF5cbwvmXLcwZZsYfF8MjFj/AN/LgNNurS35FXeiyb19PszPksXpvFvdxO78ME/iGTtt9lYKdQ2sAWoR8uoQWQCZMR70daQgsg+D+xB8uyCAuMzQzQHYoI2dMTa4O3coLIBltYrtSQgNaQ7TM7+tUELXFstEHaKQLwgriHBpdXYgdTFECB7nwzafS0IMxSIGo1PW3zQVwc1xrpAi02+yCQHgaQaSD1+4ug0SARJ1OFhvPogGW6dxNN4NkAgkiXdKdwgWdep97rsgzOqCBNJApT7dEASJqGtiR8+6ChxcQd/1MeSDkb2D8NZxL2gYGYe2Rw/Ax8zWtYGEPkcRcWsttj/Kz8dTfN+Idm1QtWICAgICAgICAgICAgICDjf2+cLbn+Qn52Br4fmMHGDtwHu/BI/8x8l3aO22Tb3Vfkab4d/aXWeH2Hmf1ZXrKpNJBIBsDeZ6IAYC9pmoA7mfRAkS4RFhB67fZBQDasCY3n5IJQD8M+HqRaiBUgajSR0IP26ILriDX1NxYFBBEmKg/SlumyCOYYkkVI2v9kF1DXon1neyAZgk7GXeqBN/kSdq2+qCtdMgCQag3J/VkEaQLmXbQZE+nVAHh6Em8790AS4kRPXadvuge9QkV94TWP7boDtQloEzvEEoLAa4MFRYA373QDLXmTS83OwQcv8A7N2E0cw8Xe6NQyrWt66TiCfsq3Xftj8rrxf77fh2BVM0ggICAgICAgICAgICAgIPkvauxr/Z3xwPqBgB0d2vaR9l06b/AJIces/4bfh1KlpmHV36DvK0TGtQTAAoIb270PZBdQJAm5k38vugxpMEjzJP6oiUdRhFgRc2KDeqQCBemkdPJEBOqCKt+GRMxe6CF0x02BNT8+qCOaT3PaovfqiV9xnQxSdqyiDSNMTS36p6oJqLZinaKz5Sg0fdPwiAO8WsgCst+1PogS8h2m9+lUEILauqRO8d/wA0AyHg/DYk/WZQUfwWAu3r9UEbDPDuIpIqgrg6QIFb+coI7cgm9IvaBVByl+zpnBg865rKGjcxksTSOrm4uG4fSVX62Poj8rfxk7ZZj4dj1SNOICAgICAgICAgICAgICD4X22ZoZb2bcVaTBxzgYLe+rHYSPkCuvSxvlhX6+22Cf8APu6sUdUiBaenW4utAyI46hqEQN+k7EnzQV1Kmu+obVBAQRrSRJNfyFuiC+8IHSs2jtsgmqTOkgzFSgSIaGzMW6oNE22Fa7yPLyQRodBY6dxAi2yCQbSZNDNe6B4J00m0fqqCigNp2juEFMGSDJtem8IMEGgcRBvF/K3VEm51OrUeeyIUVh1J3d5CtkAmQYABJg9j+ggHVqioNSPWUA0eKUJFdrRZBqWONIMD+8oMtMgMB7gjz9EH23sZzv8AgfaTwp9mY5xcB5tP4mE8N/8AKFy6qN8Uu/Q22zVdq1nmvEBAQEBAQEBAQEBAQEBBxR+0ZnfwuUMhkGmHZrOsJHVmFhvJ/wDItVjoo+uZ+FP5O22OI95ddaB8E9rK6ZlSATq2N9UxEzdAcJmRSsur80GQ6nhoBtIMxVBpriCTYdCRtdBCAYABpeOiCCC0jyMzQ/PyRLXvAXIrIiKj1CIR8iXN7CPogUcQbAyTJ/IIHhmJ8N5k9UDVTU4dB4e390ADxahSImDS4lBSRAoWiDB2vS0IJSBUVpBqSgOFWtJm471pdBXapAdSbHoUEo0CT4bDqKVQAaA2gQI2FKoAo7wxWkmEBtRqmnrM9UHtOVeIDhXMnCeJaoblc1l8V0W0txWucPKF55I3rMfD2w29OSJ9pdzVmG4EBAQEBAQEBAQEBAQEBBwN+0tnw/PcE4WajBwsfMvE/wDuOaxs/wDYVb6GOJlnvKW+qsOFm6tMkkAd5iIVoo1BBAG1h0gHuiFBfBAoZiLmf7IJqLXUdIMkNiboJFPEQdhIogoqJHkI/hnseyAB5ilQYHWRsgpaQCQI3mbxVBNRgkuGn4Ra1kAtAPjudhtGw80DSLaaxGmkdUCAYMQdyJ9DPRAIbIaTSkztT5IFZDnETFfMdUEIGLUAxFTcd47okgEmga00H8602RDQ1aATe48z8+qDMijhAFL07/RBqGyC2IJggR/JADhNIG1aW/ugMqXaaTuLSg8vhPCuIcc4jgcJ4ZgHHzeYfowsIQTUSTJIAAuTtcr5taKxvL7pSbW2juXc3INzLMjl252DmBhsGPpMt/EDRqg9JWXnbfhua77Rv28hQ+hAQEBAQEBAQEBAQEBB12/aG4TxvD5nweOY2CTw/FwcPLZXHadQDmBz3Md0MuJHUK60Vq+jb7s15Klv1PVPWzilhv1Eydh5qxUzGqGmaG8SQTcfNBYLo07Gb0MFBqJmYkxqESgw410ltIqbWg1QaBDq6SJuL16IIW1BaRBoDsIqgpBDaCSTM0I9EEBrqadzAAgQgEhphxJDtqgfdBfwvFc/7t0GNThQ+KNjYibols+FpdqrB8jCIZaC0EGDTY0Iug3AbOswBY2QRpBPjppsRQdkEbUB0dSY+6DNCTqqPgi5RLTbhzjtEk9EQYkag6gIg6ut0Bou0UBmhi5JCDnH9nHgGC";
    this.noAvatarBase64Img += "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";

    // #### baseline state ####
    this.snapshot = this.props.user;

    this.state= {
      //### meta-state ###
      alertMessage: '',

      // #### update flags ####
      updatingAvatarSrc:false,
      updatingBio:false,

      // #### user profile attributes ####
      avatarSrc: this.snapshot.avatarSrc || this.noAvatarBase64Img,
      bio: this.snapshot.bio || '',
      email: this.snapshot.email || '',
      categories: this.snapshot.categories || [],
      followers: this.snapshot.followers || [],
      following: this.snapshot.following || [],
      keywords: this.snapshot.keywords || [],
      media: this.snapshot.media || [],
      username: this.snapshot.username || ''
    };

    this.prfClient = new PrfHttpClient();
  }

  // ######################### Nano Event Handlers ##################
  onBioChange = (e) => {
    this.setState({ bio: e.target.value });
  }

  resetBio = () => {
    this.setState({bio: this.snapshot.bio, updatingBio:false});
  }


  // ######################### Micro Event Handlers (events internal to component) ########################
  beginAvatarUpload = () => {
    this.setState({updatingAvatarSrc:true});
  }

  beginBioEdits = () => {
    this.setState({updatingBio:true});
  }

  // ############################## MACRO Event handlers & triggers #############################
  onDropAvatarImg = (base64Image) => {
    var updateObj = { _id: this.props.user._id, avatarSrc:base64Image };
    this.prfClient.updateProfile(updateObj, this.onAvatarSaved);
  }

  triggerUpdateBio = (e) => {
    e.preventDefault();
    let theProfile = {_id:this.props.user._id, bio: this.state.bio};
  
    //trigger update
    this.prfClient.updateProfile(theProfile, this.onBioSaved);
  }

  handleDelete = (e) => {
    e.preventDefault();
    let id = this.props.user._id;
    console.log("PrfBaseProfile::handleDelete - id for deletion: [" + id + "]");

    //trigger delete
    this.prfClient.deleteProfile(id, this.onDeleted);
  }

  // ############################## COMPLETION EVENTS #############################

  onAvatarSaved = (responseData) => {
    console.log("PrfBaseProfile::onAvatarSaved ...");
    this.updateLocalSnapshot(responseData, {updatingAvatarSrc:false});
  }

  onBioSaved =(responseData)=> {
    this.updateLocalSnapshot(responseData, {updatingBio:false});    
  }

  onDeleted =(responseData)=> {
    if(responseData.deletedCount == 1){
      this.props.notifyOnDelete(this.props.user._id);
    } else {
      console.error("PrfBaseProfile::onDeleted : delete request failed");      
    }
  }

  updateLocalSnapshot = (responseData, microState) => {
    if(!responseData.profileList){
      console.error("PrfBaseProfile::updateLocalSnapshot : update failed!");
      let scope = this;
      this.setState({alertMessage: 'something went wrong with the update'}, function(){
        setTimeout(scope.setState({alertMessage:''}), 3000);
      });
    } else {
      console.log("PrfBaseProfile::updateLocalSnapshot : updating...");
      this.snapshot = responseData.profileList[0];
      let newState = Object.assign ({
        avatarSrc: this.snapshot.avatarSrc || this.noAvatarBase64Img,
        bio: this.snapshot.bio || '',
        email: this.snapshot.email || '',
        categories: this.snapshot.categories || [],
        followers: this.snapshot.followers || [],
        following: this.snapshot.following || [],
        keywords: this.snapshot.keywords || [],
        media: this.snapshot.media || [],
        username: this.snapshot.username || ''
      }, microState);
      console.log("%%% new state %%%", newState);
      this.setState(newState);
    }
  }

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5

  render =() => {
    //up to sub-classes to fully implement render:
    return (null);
  }
}
