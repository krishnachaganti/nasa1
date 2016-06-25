import Imap from 'imap';

export function mailConnection(config) {
  const imap = new Imap({
    user: config.user,
    password: config.password,
    host: 'mail.nasaupdate.com',
    port: 993,
    keepAlive: true,
    tls: true,
    authTimeout: 3000
  });

  return imap;
}
