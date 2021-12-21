package com.deimantas.thapi.security.services;

import javax.servlet.http.HttpServletRequest;

public interface SecurityService {
    String findLoggedInUsername();
    String getCurrentUsername(final HttpServletRequest request);
}
