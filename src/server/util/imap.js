import Imap from 'imap';

export function initImap(config) {
  const imap = new Imap({
    user: 'status@nasaupdate.com',
    password: 'u7d%8(KcbPE5u-8L',
    host: 'mail.nasaupdate.com',
    port: 993,
    tls: {
      secureProtocol: 'TLSv1_method'
    }
  });

  return imap;
}
