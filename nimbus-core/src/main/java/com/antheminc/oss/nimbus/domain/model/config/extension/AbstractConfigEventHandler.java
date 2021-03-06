/**
 *  Copyright 2016-2019 the original author or authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * 
 */
package com.antheminc.oss.nimbus.domain.model.config.extension;

import com.antheminc.oss.nimbus.InvalidConfigException;
import com.antheminc.oss.nimbus.domain.cmd.exec.CommandPathVariableResolver;
import com.antheminc.oss.nimbus.domain.model.config.ParamConfig;
import com.antheminc.oss.nimbus.domain.model.state.EntityState.Param;

import lombok.RequiredArgsConstructor;


/**
 * @author Soham Chakravarti
 *
 */
@RequiredArgsConstructor
public abstract class AbstractConfigEventHandler {
	
	protected final CommandPathVariableResolver cmdPathResolver;

	protected <T> T castOrEx(Class<T> type, ParamConfig<?> param) {
		if(!type.isInstance(param))
			throw new InvalidConfigException("Handler supports ParamConfig of type: "+type+" but found of type: "+param.getClass());
		
		return type.cast(param);
	}
	
	protected String resolvePath(String text, Param<?> param) {
		String resolvedPath = this.cmdPathResolver.resolve(param, text);
		return resolvedPath;
	}
}
