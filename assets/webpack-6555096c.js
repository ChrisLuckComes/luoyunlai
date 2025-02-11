import{j as e,d as o}from"./index-274349b8.js";import{U as t}from"./useMarkdown-04b9ffa9.js";import{A as y}from"./Anchor-b0d09d4b.js";import"./index-fc2fd434.js";const f=`\`\`\`js
const webpack = /** @type {WebpackFunctionSingle & WebpackFunctionMulti} */ (
	/**
	 * @param {WebpackOptions | (ReadonlyArray<WebpackOptions> & MultiCompilerOptions)} options options
	 * @param {Callback<Stats> & Callback<MultiStats>=} callback callback
	 * @returns {Compiler | MultiCompiler}
	 */
	(options, callback) => {
		const create = () => {
			if (!asArray(options).every(webpackOptionsSchemaCheck)) {
				getValidateSchema()(webpackOptionsSchema, options);
				util.deprecate(
					() => {},
					"webpack bug: Pre-compiled schema reports error while real schema is happy. This has performance drawbacks.",
					"DEP_WEBPACK_PRE_COMPILED_SCHEMA_INVALID"
				)();
			}
			/** @type {MultiCompiler|Compiler} */
			let compiler;
			let watch = false;
			/** @type {WatchOptions|WatchOptions[]} */
			let watchOptions;
			if (Array.isArray(options)) {
				/** @type {MultiCompiler} */
				compiler = createMultiCompiler(
					options,
					/** @type {MultiCompilerOptions} */ (options)
				);
				watch = options.some(options => options.watch);
				watchOptions = options.map(options => options.watchOptions || {});
			} else {
				const webpackOptions = /** @type {WebpackOptions} */ (options);
				/** @type {Compiler} */
				compiler = createCompiler(webpackOptions);
				watch = webpackOptions.watch;
				watchOptions = webpackOptions.watchOptions || {};
			}
			return { compiler, watch, watchOptions };
		};
		if (callback) {
			try {
				const { compiler, watch, watchOptions } = create();
				if (watch) {
					compiler.watch(watchOptions, callback);
				} else {
					compiler.run((err, stats) => {
						compiler.close(err2 => {
							callback(err || err2, stats);
						});
					});
				}
				return compiler;
			} catch (err) {
				process.nextTick(() => callback(err));
				return null;
			}
		} else {
			const { compiler, watch } = create();
			if (watch) {
				util.deprecate(
					() => {},
					"A 'callback' argument needs to be provided to the 'webpack(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback.",
					"DEP_WEBPACK_WATCH_WITHOUT_CALLBACK"
				)();
			}
			return compiler;
		}
	}
);
\`\`\``,b=`\`\`\`js
/**
 * @param {WebpackOptions} rawOptions options object
 * @returns {Compiler} a compiler
 */
const createCompiler = rawOptions => {
    // 内部处理传入的options
	const options = getNormalizedWebpackOptions(rawOptions);
    // 日志相关
	applyWebpackOptionsBaseDefaults(options);
    // create compiler
	const compiler = new Compiler(options.context, options);
	new NodeEnvironmentPlugin({
		infrastructureLogging: options.infrastructureLogging
	}).apply(compiler);
    // 判断plugins是否是数组，如果是就顺序执行，并且将compiler作为参数传入plugin
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
    // 应用options和默认配置合并之后的配置
	applyWebpackOptionsDefaults(options);
    // 执行环境配置相关hook
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
    // 执行WebpackOptionsApply，根据options配置调用内置plugin给compiler添加属性
	new WebpackOptionsApply().process(options, compiler);
    // 执行初始化hook
	compiler.hooks.initialize.call();
	return compiler;
};
\`\`\``,k=`\`\`\`js
class Compiler {
	/**
	 * @param {string} context the compilation path
	 * @param {WebpackOptions} options options
	 */
	constructor(context, options = /** @type {WebpackOptions} */ ({})) {
		this.hooks = Object.freeze({
			/** @type {SyncHook<[]>} */
			initialize: new SyncHook([]),

			/** @type {SyncBailHook<[Compilation], boolean>} */
			shouldEmit: new SyncBailHook(["compilation"]),
			/** @type {AsyncSeriesHook<[Stats]>} */
			done: new AsyncSeriesHook(["stats"]),
			/** @type {SyncHook<[Stats]>} */
			afterDone: new SyncHook(["stats"]),
			/** @type {AsyncSeriesHook<[]>} */
			additionalPass: new AsyncSeriesHook([]),
			/** @type {AsyncSeriesHook<[Compiler]>} */
			beforeRun: new AsyncSeriesHook(["compiler"]),
			/** @type {AsyncSeriesHook<[Compiler]>} */
			run: new AsyncSeriesHook(["compiler"]),
			/** @type {AsyncSeriesHook<[Compilation]>} */
			emit: new AsyncSeriesHook(["compilation"]),
			/** @type {AsyncSeriesHook<[string, AssetEmittedInfo]>} */
			assetEmitted: new AsyncSeriesHook(["file", "info"]),
			/** @type {AsyncSeriesHook<[Compilation]>} */
			afterEmit: new AsyncSeriesHook(["compilation"]),

			/** @type {SyncHook<[Compilation, CompilationParams]>} */
			thisCompilation: new SyncHook(["compilation", "params"]),
			/** @type {SyncHook<[Compilation, CompilationParams]>} */
			compilation: new SyncHook(["compilation", "params"]),
			/** @type {SyncHook<[NormalModuleFactory]>} */
			normalModuleFactory: new SyncHook(["normalModuleFactory"]),
			/** @type {SyncHook<[ContextModuleFactory]>}  */
			contextModuleFactory: new SyncHook(["contextModuleFactory"]),

			/** @type {AsyncSeriesHook<[CompilationParams]>} */
			beforeCompile: new AsyncSeriesHook(["params"]),
			/** @type {SyncHook<[CompilationParams]>} */
			compile: new SyncHook(["params"]),
			/** @type {AsyncParallelHook<[Compilation]>} */
			make: new AsyncParallelHook(["compilation"]),
			/** @type {AsyncParallelHook<[Compilation]>} */
			finishMake: new AsyncSeriesHook(["compilation"]),
			/** @type {AsyncSeriesHook<[Compilation]>} */
			afterCompile: new AsyncSeriesHook(["compilation"]),

			/** @type {AsyncSeriesHook<[]>} */
			readRecords: new AsyncSeriesHook([]),
			/** @type {AsyncSeriesHook<[]>} */
			emitRecords: new AsyncSeriesHook([]),

			/** @type {AsyncSeriesHook<[Compiler]>} */
			watchRun: new AsyncSeriesHook(["compiler"]),
			/** @type {SyncHook<[Error]>} */
			failed: new SyncHook(["error"]),
			/** @type {SyncHook<[string | null, number]>} */
			invalid: new SyncHook(["filename", "changeTime"]),
			/** @type {SyncHook<[]>} */
			watchClose: new SyncHook([]),
			/** @type {AsyncSeriesHook<[]>} */
			shutdown: new AsyncSeriesHook([]),

			/** @type {SyncBailHook<[string, string, any[]], true>} */
			infrastructureLog: new SyncBailHook(["origin", "type", "args"]),

			// TODO the following hooks are weirdly located here
			// TODO move them for webpack 5
			/** @type {SyncHook<[]>} */
			environment: new SyncHook([]),
			/** @type {SyncHook<[]>} */
			afterEnvironment: new SyncHook([]),
			/** @type {SyncHook<[Compiler]>} */
			afterPlugins: new SyncHook(["compiler"]),
			/** @type {SyncHook<[Compiler]>} */
			afterResolvers: new SyncHook(["compiler"]),
			/** @type {SyncBailHook<[string, Entry], boolean>} */
			entryOption: new SyncBailHook(["context", "entry"])
		});

		this.webpack = webpack;

		/** @type {string=} */
		this.name = undefined;
		/** @type {Compilation=} */
		this.parentCompilation = undefined;
		/** @type {Compiler} */
		this.root = this;
		/** @type {string} */
		this.outputPath = "";
		/** @type {Watching} */
		this.watching = undefined;

		/** @type {OutputFileSystem} */
		this.outputFileSystem = null;
		/** @type {IntermediateFileSystem} */
		this.intermediateFileSystem = null;
		/** @type {InputFileSystem} */
		this.inputFileSystem = null;
		/** @type {WatchFileSystem} */
		this.watchFileSystem = null;

		/** @type {string|null} */
		this.recordsInputPath = null;
		/** @type {string|null} */
		this.recordsOutputPath = null;
		this.records = {};
		/** @type {Set<string | RegExp>} */
		this.managedPaths = new Set();
		/** @type {Set<string | RegExp>} */
		this.immutablePaths = new Set();

		/** @type {ReadonlySet<string>} */
		this.modifiedFiles = undefined;
		/** @type {ReadonlySet<string>} */
		this.removedFiles = undefined;
		/** @type {ReadonlyMap<string, FileSystemInfoEntry | "ignore" | null>} */
		this.fileTimestamps = undefined;
		/** @type {ReadonlyMap<string, FileSystemInfoEntry | "ignore" | null>} */
		this.contextTimestamps = undefined;
		/** @type {number} */
		this.fsStartTime = undefined;

		/** @type {ResolverFactory} */
		this.resolverFactory = new ResolverFactory();

		this.infrastructureLogger = undefined;

		this.options = options;

		this.context = context;

		this.requestShortener = new RequestShortener(context, this.root);

		this.cache = new Cache();

		/** @type {Map<Module, { buildInfo: object, references: WeakMap<Dependency, Module>, memCache: WeakTupleMap }> | undefined} */
		this.moduleMemCaches = undefined;

		this.compilerPath = "";

		/** @type {boolean} */
		this.running = false;

		/** @type {boolean} */
		this.idle = false;

		/** @type {boolean} */
		this.watchMode = false;

		this._backCompat = this.options.experiments.backCompat !== false;

		/** @type {Compilation} */
		this._lastCompilation = undefined;
		/** @type {NormalModuleFactory} */
		this._lastNormalModuleFactory = undefined;

		/** @private @type {WeakMap<Source, { sizeOnlySource: SizeOnlySource, writtenTo: Map<string, number> }>} */
		this._assetEmittingSourceCache = new WeakMap();
		/** @private @type {Map<string, number>} */
		this._assetEmittingWrittenFiles = new Map();
		/** @private @type {Set<string>} */
		this._assetEmittingPreviousFiles = new Set();
	}
}
\`\`\``,x=`\`\`\`js
class WebpackOptionsApply extends OptionsApply {
    /**
	 * @param {WebpackOptions} options options object
	 * @param {Compiler} compiler compiler object
	 * @returns {WebpackOptions} options object
	 */
	process(options, compiler) {
        // 如果有额外，调用ExternalsPlugin来加载，这里就可以用CDN的方式来引入模块
        if (options.externals) {
            //@ts-expect-error https://github.com/microsoft/TypeScript/issues/41697
            const ExternalsPlugin = require("./ExternalsPlugin");
            new ExternalsPlugin(options.externalsType, options.externals).apply(
                compiler
            );
        }

        // 根据devtool的配置处理代码
        if (options.devtool) {
			if (options.devtool.includes("source-map")) {
				const hidden = options.devtool.includes("hidden");
				const inline = options.devtool.includes("inline");
				const evalWrapped = options.devtool.includes("eval");
				const cheap = options.devtool.includes("cheap");
				const moduleMaps = options.devtool.includes("module");
				const noSources = options.devtool.includes("nosources");
				const Plugin = evalWrapped
					? require("./EvalSourceMapDevToolPlugin")
					: require("./SourceMapDevToolPlugin");
				new Plugin({
					filename: inline ? null : options.output.sourceMapFilename,
					moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate,
					fallbackModuleFilenameTemplate:
						options.output.devtoolFallbackModuleFilenameTemplate,
					append: hidden ? false : undefined,
					module: moduleMaps ? true : cheap ? false : true,
					columns: cheap ? false : true,
					noSources: noSources,
					namespace: options.output.devtoolNamespace
				}).apply(compiler);
			} else if (options.devtool.includes("eval")) {
				const EvalDevToolModulePlugin = require("./EvalDevToolModulePlugin");
				new EvalDevToolModulePlugin({
					moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate,
					namespace: options.output.devtoolNamespace
				}).apply(compiler);
			}
		}

        // 重点 调用javascriptParser对js进行语法分析，生成chunkGraph和ModuleGraph
        new JavascriptModulesPlugin().apply(compiler);

        // 入口Plugin
        new EntryOptionPlugin().apply(compiler);

        // 兼容性Plugin 新增辅助函数等
		new CompatibilityPlugin().apply(compiler);
		new HarmonyModulesPlugin({
			topLevelAwait: options.experiments.topLevelAwait
		}).apply(compiler);

        // CJS模块 Plugin
        new CommonJsPlugin().apply(compiler);

        // 处理loader的Plugin
		new LoaderPlugin({}).apply(compiler);
        // import相关Plugin
        new ImportPlugin().apply(compiler);
        // 缓存相关
        if (options.cache && typeof options.cache === "object") {
			const cacheOptions = options.cache;
			switch (cacheOptions.type) {
				case "memory": {
					if (isFinite(cacheOptions.maxGenerations)) {
						//@ts-expect-error https://github.com/microsoft/TypeScript/issues/41697
						const MemoryWithGcCachePlugin = require("./cache/MemoryWithGcCachePlugin");
						new MemoryWithGcCachePlugin({
							maxGenerations: cacheOptions.maxGenerations
						}).apply(compiler);
					} else {
						//@ts-expect-error https://github.com/microsoft/TypeScript/issues/41697
						const MemoryCachePlugin = require("./cache/MemoryCachePlugin");
						new MemoryCachePlugin().apply(compiler);
					}
					if (cacheOptions.cacheUnaffected) {
						if (!options.experiments.cacheUnaffected) {
							throw new Error(
								"'cache.cacheUnaffected: true' is only allowed when 'experiments.cacheUnaffected' is enabled"
							);
						}
						compiler.moduleMemCaches = new Map();
					}
					break;
				}
				case "filesystem": {
					const AddBuildDependenciesPlugin = require("./cache/AddBuildDependenciesPlugin");
					for (const key in cacheOptions.buildDependencies) {
						const list = cacheOptions.buildDependencies[key];
						new AddBuildDependenciesPlugin(list).apply(compiler);
					}
					if (!isFinite(cacheOptions.maxMemoryGenerations)) {
						//@ts-expect-error https://github.com/microsoft/TypeScript/issues/41697
						const MemoryCachePlugin = require("./cache/MemoryCachePlugin");
						new MemoryCachePlugin().apply(compiler);
					} else if (cacheOptions.maxMemoryGenerations !== 0) {
						//@ts-expect-error https://github.com/microsoft/TypeScript/issues/41697
						const MemoryWithGcCachePlugin = require("./cache/MemoryWithGcCachePlugin");
						new MemoryWithGcCachePlugin({
							maxGenerations: cacheOptions.maxMemoryGenerations
						}).apply(compiler);
					}
					if (cacheOptions.memoryCacheUnaffected) {
						if (!options.experiments.cacheUnaffected) {
							throw new Error(
								"'cache.memoryCacheUnaffected: true' is only allowed when 'experiments.cacheUnaffected' is enabled"
							);
						}
						compiler.moduleMemCaches = new Map();
					}
					switch (cacheOptions.store) {
						case "pack": {
							const IdleFileCachePlugin = require("./cache/IdleFileCachePlugin");
							const PackFileCacheStrategy = require("./cache/PackFileCacheStrategy");
							new IdleFileCachePlugin(
								new PackFileCacheStrategy({
									compiler,
									fs: compiler.intermediateFileSystem,
									context: options.context,
									cacheLocation: cacheOptions.cacheLocation,
									version: cacheOptions.version,
									logger: compiler.getInfrastructureLogger(
										"webpack.cache.PackFileCacheStrategy"
									),
									snapshot: options.snapshot,
									maxAge: cacheOptions.maxAge,
									profile: cacheOptions.profile,
									allowCollectingMemory: cacheOptions.allowCollectingMemory,
									compression: cacheOptions.compression
								}),
								cacheOptions.idleTimeout,
								cacheOptions.idleTimeoutForInitialStore,
								cacheOptions.idleTimeoutAfterLargeChanges
							).apply(compiler);
							break;
						}
						default:
							throw new Error("Unhandled value for cache.store");
					}
					break;
				}
				default:
					// @ts-expect-error Property 'type' does not exist on type 'never'. ts(2339)
					throw new Error(\`Unknown cache type \${cacheOptions.type}\`);
			}
		}
    }
}
\`\`\``,g=`\`\`\`js
/**
 * @param {Callback<Compilation>} callback signals when the compilation finishes
 * @returns {void}
 */
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
        if (err) return callback(err);

        this.hooks.compile.call(params);

        const compilation = this.newCompilation(params);

        const logger = compilation.getLogger("webpack.Compiler");

		// ……
        });
    });
}

createCompilation(params) {
    this._cleanupLastCompilation();
    return (this._lastCompilation = new Compilation(this, params));
}

/**
 * @param {CompilationParams} params the compilation parameters
 * @returns {Compilation} the created compilation
 */
newCompilation(params) {
    const compilation = this.createCompilation(params);
    compilation.name = this.name;
    compilation.records = this.records;
    this.hooks.thisCompilation.call(compilation, params);
    this.hooks.compilation.call(compilation, params);
    return compilation;
}
\`\`\``,M=`\`\`\`js
createNormalModuleFactory() {
	this._cleanupLastNormalModuleFactory();
	const normalModuleFactory = new NormalModuleFactory({
		context: this.options.context,
		fs: this.inputFileSystem,
		resolverFactory: this.resolverFactory,
		options: this.options.module,
		associatedObjectForCache: this.root,
		layers: this.options.experiments.layers
	});
	this._lastNormalModuleFactory = normalModuleFactory;
	this.hooks.normalModuleFactory.call(normalModuleFactory);
	return normalModuleFactory;
}

createContextModuleFactory() {
	const contextModuleFactory = new ContextModuleFactory(this.resolverFactory);
	this.hooks.contextModuleFactory.call(contextModuleFactory);
	return contextModuleFactory;
}

newCompilationParams() {
	const params = {
		normalModuleFactory: this.createNormalModuleFactory(),
		contextModuleFactory: this.createContextModuleFactory()
	};
	return params;
}
\`\`\``,w=`\`\`\`js
// 新增RuleSetCompiler，解析module rule
const ruleSetCompiler = new RuleSetCompiler([
 ……
]);

class NormalModuleFactory extends ModuleFactory {
	/**
	 * @param {Object} param params
	 * @param {string=} param.context context
	 * @param {InputFileSystem} param.fs file system
	 * @param {ResolverFactory} param.resolverFactory resolverFactory
	 * @param {ModuleOptions} param.options options
	 * @param {Object=} param.associatedObjectForCache an object to which the cache will be attached
	 * @param {boolean=} param.layers enable layers
	 */
	constructor({
		context,
		fs,
		resolverFactory,
		options,
		associatedObjectForCache,
		layers = false
	}) {
		this.ruleSet = ruleSetCompiler.compile([
			{
				rules: options.defaultRules
			},
			{
				rules: options.rules
			}
		]);

		// …… 
	}
}
\`\`\``,C=`\`\`\`js
class LoaderPlugin {
	/**
	 * @param {Object} options options
	 */
	constructor(options = {}) {}

	/**
	 * Apply the plugin
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"LoaderPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					LoaderDependency,
					normalModuleFactory
				);
				compilation.dependencyFactories.set(
					LoaderImportDependency,
					normalModuleFactory
				);
			}
		);

		compiler.hooks.compilation.tap("LoaderPlugin", compilation => {
			const moduleGraph = compilation.moduleGraph;
			NormalModule.getCompilationHooks(compilation).loader.tap(
				"LoaderPlugin",
				loaderContext => {
					/**
					 * @param {string} request the request string to load the module from
					 * @param {LoadModuleCallback} callback callback returning the loaded module or error
					 * @returns {void}
					 */
					loaderContext.loadModule = (request, callback) => {
						const dep = new LoaderDependency(request);
						dep.loc = {
							name: request
						};
						const factory = compilation.dependencyFactories.get(
							/** @type {DepConstructor} */ (dep.constructor)
						);
						if (factory === undefined) {
							return callback(
								new Error(
									\`No module factory available for dependency type: \${dep.constructor.name}\`
								)
							);
						}
						// 开始将模块添加到buildQueue队列并循环执行
						compilation.buildQueue.increaseParallelism();
						compilation.handleModuleCreation(
							{
								factory,
								dependencies: [dep],
								originModule: loaderContext._module,
								context: loaderContext.context,
								recursive: false
							},
							err => {
								compilation.buildQueue.decreaseParallelism();
								if (err) {
									return callback(err);
								}
								const referencedModule = moduleGraph.getModule(dep);
								if (!referencedModule) {
									return callback(new Error("Cannot load the module"));
								}
								if (referencedModule.getNumberOfErrors() > 0) {
									return callback(
										new Error("The loaded module contains errors")
									);
								}
								const moduleSource = referencedModule.originalSource();
								if (!moduleSource) {
									return callback(
										new Error(
											"The module created for a LoaderDependency must have an original source"
										)
									);
								}
								let source, map;
								if (moduleSource.sourceAndMap) {
									const sourceAndMap = moduleSource.sourceAndMap();
									map = sourceAndMap.map;
									source = sourceAndMap.source;
								} else {
									map = moduleSource.map();
									source = moduleSource.source();
								}
								const fileDependencies = new LazySet();
								const contextDependencies = new LazySet();
								const missingDependencies = new LazySet();
								const buildDependencies = new LazySet();
								referencedModule.addCacheDependencies(
									fileDependencies,
									contextDependencies,
									missingDependencies,
									buildDependencies
								);

								for (const d of fileDependencies) {
									loaderContext.addDependency(d);
								}
								for (const d of contextDependencies) {
									loaderContext.addContextDependency(d);
								}
								for (const d of missingDependencies) {
									loaderContext.addMissingDependency(d);
								}
								for (const d of buildDependencies) {
									loaderContext.addBuildDependency(d);
								}
								return callback(null, source, map, referencedModule);
							}
						);
					};

					/**
					 * @param {string} request the request string to load the module from
					 * @param {ImportModuleOptions=} options options
					 * @param {ImportModuleCallback=} callback callback returning the exports
					 * @returns {void}
					 */
					const importModule = (request, options, callback) => {
						const dep = new LoaderImportDependency(request);
						dep.loc = {
							name: request
						};
						const factory = compilation.dependencyFactories.get(
							/** @type {DepConstructor} */ (dep.constructor)
						);
						if (factory === undefined) {
							return callback(
								new Error(
									\`No module factory available for dependency type: \${dep.constructor.name}\`
								)
							);
						}
						compilation.buildQueue.increaseParallelism();
						compilation.handleModuleCreation(
							{
								factory,
								dependencies: [dep],
								originModule: loaderContext._module,
								contextInfo: {
									issuerLayer: options.layer
								},
								context: loaderContext.context,
								connectOrigin: false
							},
							err => {
								compilation.buildQueue.decreaseParallelism();
								if (err) {
									return callback(err);
								}
								const referencedModule = moduleGraph.getModule(dep);
								if (!referencedModule) {
									return callback(new Error("Cannot load the module"));
								}
								compilation.executeModule(
									referencedModule,
									{
										entryOptions: {
											baseUri: options.baseUri,
											publicPath: options.publicPath
										}
									},
									(err, result) => {
										if (err) return callback(err);
										for (const d of result.fileDependencies) {
											loaderContext.addDependency(d);
										}
										for (const d of result.contextDependencies) {
											loaderContext.addContextDependency(d);
										}
										for (const d of result.missingDependencies) {
											loaderContext.addMissingDependency(d);
										}
										for (const d of result.buildDependencies) {
											loaderContext.addBuildDependency(d);
										}
										if (result.cacheable === false)
											loaderContext.cacheable(false);
										for (const [name, { source, info }] of result.assets) {
											const { buildInfo } = loaderContext._module;
											if (!buildInfo.assets) {
												buildInfo.assets = Object.create(null);
												buildInfo.assetsInfo = new Map();
											}
											buildInfo.assets[name] = source;
											buildInfo.assetsInfo.set(name, info);
										}
										callback(null, result.exports);
									}
								);
							}
						);
					};

					/**
					 * @param {string} request the request string to load the module from
					 * @param {ImportModuleOptions} options options
					 * @param {ImportModuleCallback=} callback callback returning the exports
					 * @returns {Promise<any> | void} exports
					 */
					loaderContext.importModule = (request, options, callback) => {
						if (!callback) {
							return new Promise((resolve, reject) => {
								importModule(request, options || {}, (err, result) => {
									if (err) reject(err);
									else resolve(result);
								});
							});
						}
						return importModule(request, options || {}, callback);
					};
				}
			);
		});
	}
}
module.exports = LoaderPlugin;
\`\`\``,S=`\`\`\`js
/**
 * @typedef {Object} HandleModuleCreationOptions
 * @property {ModuleFactory} factory
 * @property {Dependency[]} dependencies
 * @property {Module | null} originModule
 * @property {Partial<ModuleFactoryCreateDataContextInfo>=} contextInfo
 * @property {string=} context
 * @property {boolean=} recursive recurse into dependencies of the created module
 * @property {boolean=} connectOrigin connect the resolved module with the origin module
 */
 // Workaround for typescript as it doesn't support function overloading in jsdoc within a class
 Compilation.prototype.factorizeModule = /** @type {{
	 (options: FactorizeModuleOptions & { factoryResult?: false }, callback: ModuleCallback): void;
	 (options: FactorizeModuleOptions & { factoryResult: true }, callback: ModuleFactoryResultCallback): void;
 }} */ (
	 function (options, callback) {
		 this.factorizeQueue.add(options, callback);
	 }
 );
/**
 * @param {HandleModuleCreationOptions} options options object
 * @param {ModuleCallback} callback callback
 * @returns {void}
 */
handleModuleCreation(
	{
		factory,
		dependencies,
		originModule,
		contextInfo,
		context,
		recursive = true,
		connectOrigin = recursive
	},
	callback
) {
	const moduleGraph = this.moduleGraph;

	const currentProfile = this.profile ? new ModuleProfile() : undefined;

	this.factorizeModule(
		{
			currentProfile,
			factory,
			dependencies,
			factoryResult: true,
			originModule,
			contextInfo,
			context
		},
		(err, factoryResult) => {
			const newModule = factoryResult.module;

			if (!newModule) {
				applyFactoryResultDependencies();
				return callback();
			}

			if (currentProfile !== undefined) {
				moduleGraph.setProfile(newModule, currentProfile);
			}

			this.addModule(newModule, (err, module) => {
				if (err) {
					applyFactoryResultDependencies();
					if (!err.module) {
						err.module = module;
					}
					this.errors.push(err);

					return callback(err);
				}

				if (
					this._unsafeCache &&
					factoryResult.cacheable !== false &&
					/** @type {any} */ (module).restoreFromUnsafeCache &&
					this._unsafeCachePredicate(module)
				) {
					const unsafeCacheableModule =
						/** @type {Module & { restoreFromUnsafeCache: Function }} */ (
							module
						);
					for (let i = 0; i < dependencies.length; i++) {
						const dependency = dependencies[i];
						moduleGraph.setResolvedModule(
							connectOrigin ? originModule : null,
							dependency,
							unsafeCacheableModule
						);
						unsafeCacheDependencies.set(dependency, unsafeCacheableModule);
					}
					if (!unsafeCacheData.has(unsafeCacheableModule)) {
						unsafeCacheData.set(
							unsafeCacheableModule,
							unsafeCacheableModule.getUnsafeCacheData()
						);
					}
				} else {
					applyFactoryResultDependencies();
					for (let i = 0; i < dependencies.length; i++) {
						const dependency = dependencies[i];
						moduleGraph.setResolvedModule(
							connectOrigin ? originModule : null,
							dependency,
							module
						);
					}
				}

				this._handleModuleBuildAndDependencies(
					originModule,
					module,
					recursive,
					callback
				);
			});
		}
	);
}

/**
 * @param {FactorizeModuleOptions} options options object
 * @param {ModuleOrFactoryResultCallback} callback callback
 * @returns {void}
 */
_factorizeModule(
	{
		currentProfile,
		factory,
		dependencies,
		originModule,
		factoryResult,
		contextInfo,
		context
	},
	callback
) {
	if (currentProfile !== undefined) {
		currentProfile.markFactoryStart();
	}
	factory.create(
		{
			contextInfo: {
				issuer: originModule ? originModule.nameForCondition() : "",
				issuerLayer: originModule ? originModule.layer : null,
				compiler: this.compiler.name,
				...contextInfo
			},
			resolveOptions: originModule ? originModule.resolveOptions : undefined,
			context: context
				? context
				: originModule
				? originModule.context
				: this.compiler.context,
			dependencies: dependencies
		},
		(err, result) => {
			if (result) {
				// TODO webpack 6: remove
				// For backward-compat
				if (result.module === undefined && result instanceof Module) {
					result = {
						module: result
					};
				}
				if (!factoryResult) {
					const {
						fileDependencies,
						contextDependencies,
						missingDependencies
					} = result;
					if (fileDependencies) {
						this.fileDependencies.addAll(fileDependencies);
					}
					if (contextDependencies) {
						this.contextDependencies.addAll(contextDependencies);
					}
					if (missingDependencies) {
						this.missingDependencies.addAll(missingDependencies);
					}
				}
			}
			if (err) {
				const notFoundError = new ModuleNotFoundError(
					originModule,
					err,
					dependencies.map(d => d.loc).filter(Boolean)[0]
				);
				return callback(notFoundError, factoryResult ? result : undefined);
			}
			if (!result) {
				return callback();
			}

			if (currentProfile !== undefined) {
				currentProfile.markFactoryEnd();
			}

			callback(null, factoryResult ? result : result.module);
		}
	);
}
\`\`\``,j=`\`\`\`js
class Compilation {
	/**
	 * Creates an instance of Compilation.
	 * @param {Compiler} compiler the compiler which created the compilation
	 * @param {CompilationParams} params the compilation parameters
	 */
	constructor(compiler, params) {
		//……
		this.hooks = Object.freeze({

		})
		//……
		/** @type {AsyncQueue<Module, string, Module>} */
		this.addModuleQueue = new AsyncQueue({
			name: "addModule",
			parent: this.processDependenciesQueue,
			getKey: module => module.identifier(),
			processor: this._addModule.bind(this)
		});
		/** @type {AsyncQueue<FactorizeModuleOptions, string, Module | ModuleFactoryResult>} */
		this.factorizeQueue = new AsyncQueue({
			name: "factorize",
			parent: this.addModuleQueue,
			processor: this._factorizeModule.bind(this)
		});
		/** @type {AsyncQueue<Module, Module, Module>} */
		this.buildQueue = new AsyncQueue({
			name: "build",
			parent: this.factorizeQueue,
			processor: this._buildModule.bind(this)
		});
	}
}
\`\`\``,O=`\`\`\`js
const { getContext, runLoaders } = require("loader-runner");

/**
 * @param {WebpackOptions} options webpack options
 * @param {Compilation} compilation the compilation
 * @param {ResolverWithOptions} resolver the resolver
 * @param {InputFileSystem} fs the file system
 * @param {NormalModuleCompilationHooks} hooks the hooks
 * @param {function((WebpackError | null)=): void} callback callback function
 * @returns {void}
 */
_doBuild(options, compilation, resolver, fs, hooks, callback) {
	const loaderContext = this._createLoaderContext(
		resolver,
		options,
		compilation,
		fs,
		hooks
	);

	const processResult = (err, result) => {
		if (err) {
			if (!(err instanceof Error)) {
				err = new NonErrorEmittedError(err);
			}
			const currentLoader = this.getCurrentLoader(loaderContext);
			const error = new ModuleBuildError(err, {
				from:
					currentLoader &&
					compilation.runtimeTemplate.requestShortener.shorten(
						currentLoader.loader
					)
			});
			return callback(error);
		}

		const source = result[0];
		const sourceMap = result.length >= 1 ? result[1] : null;
		const extraInfo = result.length >= 2 ? result[2] : null;

		if (!Buffer.isBuffer(source) && typeof source !== "string") {
			const currentLoader = this.getCurrentLoader(loaderContext, 0);
			const err = new Error(
				\`Final loader (\${
					currentLoader
						? compilation.runtimeTemplate.requestShortener.shorten(
								currentLoader.loader
						  )
						: "unknown"
				}) didn't return a Buffer or String\`
			);
			const error = new ModuleBuildError(err);
			return callback(error);
		}

		this._source = this.createSource(
			options.context,
			this.binary ? asBuffer(source) : asString(source),
			sourceMap,
			compilation.compiler.root
		);
		if (this._sourceSizes !== undefined) this._sourceSizes.clear();
		this._ast =
			typeof extraInfo === "object" &&
			extraInfo !== null &&
			extraInfo.webpackAST !== undefined
				? extraInfo.webpackAST
				: null;
		return callback();
	};

	this.buildInfo.fileDependencies = new LazySet();
	this.buildInfo.contextDependencies = new LazySet();
	this.buildInfo.missingDependencies = new LazySet();
	this.buildInfo.cacheable = true;

	try {
		hooks.beforeLoaders.call(this.loaders, this, loaderContext);
	} catch (err) {
		processResult(err);
		return;
	}

	if (this.loaders.length > 0) {
		this.buildInfo.buildDependencies = new LazySet();
	}

	// 执行loader
	runLoaders(
		{
			resource: this.resource,
			loaders: this.loaders,
			context: loaderContext,
			processResource: (loaderContext, resourcePath, callback) => {
				const resource = loaderContext.resource;
				const scheme = getScheme(resource);
				hooks.readResource
					.for(scheme)
					.callAsync(loaderContext, (err, result) => {
						if (err) return callback(err);
						if (typeof result !== "string" && !result) {
							return callback(new UnhandledSchemeError(scheme, resource));
						}
						return callback(null, result);
					});
			}
		},
		(err, result) => {
			// Cleanup loaderContext to avoid leaking memory in ICs
			loaderContext._compilation =
				loaderContext._compiler =
				loaderContext._module =
				loaderContext.fs =
					undefined;

			if (!result) {
				this.buildInfo.cacheable = false;
				return processResult(
					err || new Error("No result from loader-runner processing"),
					null
				);
			}
			this.buildInfo.fileDependencies.addAll(result.fileDependencies);
			this.buildInfo.contextDependencies.addAll(result.contextDependencies);
			this.buildInfo.missingDependencies.addAll(result.missingDependencies);
			for (const loader of this.loaders) {
				this.buildInfo.buildDependencies.add(loader.loader);
			}
			this.buildInfo.cacheable = this.buildInfo.cacheable && result.cacheable;
			processResult(err, result.result);
		}
	);
}
\`\`\``,P=`\`\`\`js
function runSyncOrAsync(fn, context, args, callback) {
	var isSync = true;
	var isDone = false;
	var isError = false; // internal error
	var reportedError = false;
	try {
		// 执行loader
		var result = (function LOADER_EXECUTION() {
			return fn.apply(context, args);
		}());
		if(isSync) {
			isDone = true;
			if(result === undefined)
				return callback();
			if(result && typeof result === "object" && typeof result.then === "function") {
				return result.then(function(r) {
					callback(null, r);
				}, callback);
			}
			return callback(null, result);
		}
	} catch(e) {
		if(isError) throw e;
		if(isDone) {
			// loader is already "done", so we cannot use the callback function
			// for better debugging we print the error on the console
			if(typeof e === "object" && e.stack) console.error(e.stack);
			else console.error(e);
			return;
		}
		isDone = true;
		reportedError = true;
		callback(e);
	}
}
\`\`\``;function E(){const r=e.jsx(t,{markdown:f}),n=e.jsx(t,{markdown:b}),i=e.jsx(t,{markdown:k}),l=e.jsx(t,{markdown:x}),a=e.jsx(t,{markdown:g}),s=e.jsx(t,{markdown:M}),c=e.jsx(t,{markdown:w}),p=e.jsx(t,{markdown:C}),d=e.jsx(t,{markdown:S}),u=e.jsx(t,{markdown:j}),m=e.jsx(t,{markdown:O}),h=e.jsx(t,{markdown:P});return e.jsxs("article",{id:"rootArticle",className:o.article,children:[e.jsxs("main",{className:o.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"Webpack"}),"Webpack是现代JS程序的打包工具，几乎每个前端都使用/曾经用过。它从入口开始构建出一个依赖图(dependency graph)，然后将项目中所需的每一个模块组合成",e.jsx("strong",{children:"bundles"}),"。 本文从源码出发，过一遍它的核心流程。",e.jsx("h2",{id:"webpack",className:o.articleTitle,children:"Webpack入口函数"}),e.jsx("div",{className:o.assist,children:"lib\\webpack.js"}),"webpack大家都知道首先需要配置",e.jsx("code",{children:"webpack.config.js"}),"，函数第一个入参就是",e.jsx("code",{children:"options"}),"，然后执行：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 执行",e.jsx("code",{children:"create"}),"函数，返回",e.jsx("code",{children:"compiler"})]}),e.jsxs("li",{children:["2. 执行",e.jsx("code",{children:"compiler.run"}),",内部会执行",e.jsx("code",{children:"compile"}),"，返回",e.jsx("code",{children:"compiler"})]})]}),r,"来看一下compiler的创建",e.jsx("h3",{id:"createCompiler",className:o.articleSubTitle,children:"createCompiler"}),e.jsxs("ul",{children:[e.jsx("li",{children:"1. 处理options"}),e.jsx("li",{children:"2. new Compiler"}),e.jsx("li",{children:"3. 遍历执行plugins"})]}),n,e.jsxs("h3",{id:"Compiler",className:o.articleSubTitle,children:["Compiler ",e.jsx("span",{className:o.assist,children:"lib\\Compiler.js"})]}),"整个类代码较长，这里关注构造函数。可以看到很多熟悉的属性，比较重要的就是hooks，自定义插件就可以选择实现这些hook。",i,e.jsx("h3",{id:"webpackOptionsApply",className:o.articleSubTitle,children:"WebpackOptionsApply"}),"这个类根据配置执行对应的内置Plugin，代码非常长",e.jsx("div",{className:o.assist,children:"lib\\WebpackOptionsApply.js"}),l,e.jsx("h3",{id:"run",className:o.articleSubTitle,children:"run"}),"创建完了compiler当然就要执行了，",e.jsx("code",{children:"run"}),"函数内部主要是执行了",e.jsx("code",{children:"compile"}),"方法，new一个",e.jsx("code",{children:"Compilation"}),"，然后执行它的hooks。",a,e.jsx("h2",{id:"loaderAndPlugin",className:o.articleTitle,children:"loader和plugin"}),"相信你一定被问到过这个问题，loader和plugin有什么区别，先分开介绍：",e.jsx("h3",{id:"loader",className:o.articleSubTitle,children:"loader"}),"webpack自带处理JS和JSON文件的能力。但是实际开发过程中经常会用到其他类型的文件，webpack允许导入任何类型的模块，然后通过loader来处理，将它们转为",e.jsx("strong",{children:"module"}),"。",e.jsx("br",{}),"loader有两个属性：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. ",e.jsx("code",{children:"test"}),"属性，识别出哪些文件会被转换"]}),e.jsxs("li",{children:["2. ",e.jsx("code",{children:"use"}),"属性，定义转换过程中应该使用的loader"]})]}),e.jsx("strong",{id:"rule",children:"解析rules"}),e.jsx("br",{}),"用过webpack的同学们都知道需要在module.rules属性中配置loader，如下是解析过程部分代码。",e.jsx("br",{}),e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 回到compile方法的第一行，首先执行",e.jsx("code",{children:"const params = this.newCompilationParams();"}),e.jsx("br",{}),e.jsx("code",{children:"newCompilationParams"}),"调用",e.jsx("code",{children:"createNormalModuleFactory()"}),"和",e.jsx("code",{children:"createContextModuleFactory"}),"两个工厂方法分别收集所有loaders，获取loader文件",s]}),e.jsxs("li",{children:["2. ",e.jsx("strong",{children:"normalModuleFactory"}),"中， new",e.jsx("strong",{children:"RuleSetCompiler"})," 然后执行",e.jsx("code",{children:"compile"}),"方法，传入loader配置",e.jsx("code",{children:"options.rules"}),e.jsx("br",{}),"方法内部会处理rules，返回正确的ruleSet规则集",c]}),e.jsxs("li",{children:["3. 回到",e.jsx("code",{children:"WebpackOptionsApply"}),"中，执行",e.jsxs("code",{children:["new LoaderPlugin(",").apply(compiler);"]}),"，开始真正的加载并导入loader",e.jsx("br",{})," 代码很长，提取关键字:",e.jsx("strong",{children:"loadModule"}),",",e.jsx("strong",{children:"importModule "})]}),e.jsxs("li",{children:["4. 在compilation类中有如下队列：",u,e.jsx("strong",{children:"loadModule"}),",",e.jsx("strong",{children:"importModule "}),"两个函数里面代码类似，都执行了",e.jsx("code",{children:"compilation.buildQueue.increaseParallelism();"}),",",e.jsx("code",{children:"handleModuleCreation"}),",它们主要是填充了这些队列，然后队列会遍历执行各自的加工函数",e.jsx("code",{children:"processor"}),p]}),e.jsxs("li",{id:"runLoader",children:["5. ",e.jsx("strong",{children:"handleModuleCreation"})," 调用",e.jsx("code",{children:"factorizeModule"}),"，填充",e.jsx("code",{children:"factorizeQueue"}),"队列，队列的加工方法是",e.jsx("code",{children:"_factorizeModule"}),"，调用了",e.jsx("code",{children:"NormalModuleFactory"}),"的",e.jsx("code",{children:"create"}),"方法。",e.jsx("br",{}),"然后在回调中调用了",e.jsx("code",{children:"addModule"}),"填充",e.jsx("code",{children:"addModuleQueue"}),"。",d,"，addModule的回调又调用了",e.jsx("code",{children:"_handleModuleBuildAndDependencies"}),e.jsx("br",{}),"它的回调调用了",e.jsx("code",{children:"buildModule"}),"填充buildQueue，buildQueue的加工方法是_buildModule，最终调用的是",e.jsx("code",{children:"NormalModuleFactory"}),"的",e.jsx("code",{children:"_doBuild"}),"方法来执行loader",e.jsx("br",{}),m]}),e.jsxs("li",{children:["6.",e.jsx("a",{className:o.href,target:"_blank",rel:"noreferrer",href:"https://github.com/webpack/loader-runner.git",children:"runLoader"}),"是webpack的内置插件，最终执行loader的代码很简单，主要都是传入上下文和参数的处理:",h]})]}),e.jsx("strong",{id:"loaderSummary",children:"总结"}),e.jsx("br",{}),"loader就是一个函数，只不过webpack会使用apply来调用，传入上下文",e.jsx("code",{children:"context"}),"，args作为参数，这样可以在函数内获取到各种数据，例如文件内容等。",e.jsx("br",{}),"多个loader会按顺序执行",e.jsx("h2",{id:"plugin",className:o.articleTitle,children:"plugin"}),"其实上面已经贴出了一个Plugin的完整栗子，",e.jsx("code",{children:"LoaderPlugin"}),"。",e.jsx("br",{}),"Plugin是一个必须实现",e.jsx("code",{children:"apply"}),"方法的类，然后调用Plugin的时候，它的apply方法的会注入compiler参数。break compiler信息量很大，包括各种hooks，自定义插件选择合适的hook在回调函数中完成自定义逻辑即可。"]}),e.jsx(y,{items:[{title:"Webpack",key:"pre",href:"#pre"},{title:"Webpack入口函数",key:"webpack",href:"#webpack",children:[{title:"createCompiler",key:"createCompiler",href:"#createCompiler"},{title:"compiler",key:"compiler",href:"#compiler"},{title:"WebpackOptionsApply",key:"webpackOptionsApply",href:"#webpackOptionsApply"},{title:"run",key:"run",href:"#run"}]},{title:"loader和plugin",key:"loaderAndPlugin",href:"#loaderAndPlugin",children:[{title:"loader",key:"loader",href:"#loader",children:[{title:"解析rules",key:"rule",href:"#rule"},{title:"执行loader",key:"runLoader",href:"#runLoader"},{title:"总结",key:"loaderSummary",href:"#loaderSummary"}]},{title:"plugin",key:"plugin",href:"#plugin"}]}]})]})}export{E as default};
