<?php
class CSRF {
	/** Session var name
	 * @var string
	 */
	public static $session = '_CSRF';
	public static $requestObj;
	public static $sessionObj;
	/** Generate CSRF value for form
	 * @param	string	$form	- Form name as session key
	 * @return	string	- token
	 */
	public function __construct($registry) {
		CSRF::$requestObj = $registry->get('requestObj');
		CSRF::$sessionObj = $registry->get('sessionObj');
	}
	 
	static function generate($form = NULL) {
		$token = CSRF::token() . CSRF::fingerprint();
		CSRF::$sessionObj->data[CSRF::$session . '_' . $form] = $token;
		return $token;
	}
	
	function getToken($form = NULL) {
		return CSRF::$sessionObj->data[CSRF::$session . '_' . $form];
	}
	/** Check CSRF value of form
	 * @param	string	$token	- Token
	 * @param	string	$form	- Form name as session key
	 * @return	boolean
	 */
	public static function check($token, $form = NULL) {
		if (isset(CSRF::$sessionObj->data[CSRF::$session . '_' . $form]) && CSRF::$sessionObj->data[CSRF::$session . '_' . $form] == $token) { // token OK
			return (substr($token,-32) == CSRF::fingerprint()); // fingerprint OK?
		}
		return false;
	}
	
	/** Generate token
	 * @param	void
	 * @return  string
	 */
	protected static function token() {
		mt_srand((double) microtime() * 10000);
		$charid = strtoupper(md5(uniqid(rand(), true)));
		//return substr($charid, 0, 8) . substr($charid, 8, 4) . substr($charid, 12, 4) . substr($charid, 16, 4) . substr($charid, 20, 12);
		return substr($charid, 0, 8) . substr($charid, 20, 4);
	}
	
	/** Returns "digital fingerprint" of user
	 * @param 	void
	 * @return 	string 	- MD5 hashed data
	 */
	protected static function fingerprint() {
		return strtoupper(md5(implode('|', array(CSRF::$requestObj->server['REMOTE_ADDR'], CSRF::$requestObj->server['HTTP_USER_AGENT']))));
	}
}